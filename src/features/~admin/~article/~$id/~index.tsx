import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { articleService } from '@/services/article.service';
import { tagService } from '@/services/tag.service';
import { Article, Tag } from '@/types';

export const Route = createFileRoute('/admin/article/$id/')({
  component: AdminArticleDetailPage,
});

function AdminArticleDetailPage() {
  const { id } = Route.useParams();

  const [article, setArticle] = useState<Article | null>(null);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [assignedTagList, setAssignedTagList] = useState<number[]>([]);
  const [newTagList, setNewTagList] = useState<number[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        articleService.getById(Number(id)).then((res) => {
          setArticle(res.data as unknown as Article);
        });
      } catch (error) {
        console.error('Failed to fetch article:', error);
      }
    };

    const fetchTagByArticle = async () => {
      try {
        articleService.getAllTagAssignToArticle(Number(id)).then((res) => {
          setAssignedTagList(res.data as unknown as number[]);
          setNewTagList(res.data as unknown as number[]);
        });
      } catch (error) {
        console.error('Failed to fetch tag list:', error);
      }
    };

    const fetchTagList = async () => {
      try {
        const fetchedTagList = await tagService.getAll();
        setTagList(fetchedTagList?.data as unknown as Tag[]);
      } catch (error) {
        console.error('Failed to fetch tag list:', error);
      }
    };

    fetchArticle();
    fetchTagList();
    fetchTagByArticle();
  }, [id]);

  const handleUpdateArticle = async () => {
    try {
      await Promise.all([
        ...newTagList.map((tagid) => {
          if (!assignedTagList.includes(tagid)) {
            return articleService.assignTag(Number(id), tagid);
          }
          return Promise.resolve();
        }),
        ...assignedTagList.map((tagid) => {
          if (!newTagList.includes(tagid)) {
            return articleService.removeTag(Number(id), tagid);
          }
          return Promise.resolve();
        }),
      ]);
    } catch (error) {
      console.error('Failed to update article:', error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <div className="relative flex flex-col">
        <Header />
        <div className="relative my-5 flex h-max w-full min-w-[360px] flex-col px-5 xs:px-[32px] sm:px-10 md:my-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)]">
          <div className="flex h-fit w-full flex-col">
            <Link
              to={'/admin'}
              className="mb-5 flex w-full flex-row items-center justify-start font-medium text-neutral"
            >
              <img
                src="/icons/chevron.svg"
                alt="chevron-left"
                className="h-5 w-auto"
              />{' '}
              <p>Back</p>
            </Link>
            <div className="mb-8 flex w-full flex-row items-center justify-between">
              <p className="text-2xl font-bold text-primary">Article Detail</p>
            </div>
            <div className="mb-8 w-full overflow-hidden rounded-lg">
              <div className="mb-8 flex w-1/2 flex-col space-y-4">
                <div className="w-full">
                  <div className="w-full text-lg font-medium text-neutral">
                    Title
                  </div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={article?.title}
                    disabled
                    className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary "
                  />
                </div>

                <div className="w-full">
                  <div className="w-full text-lg font-medium text-neutral">
                    Content
                  </div>
                  <textarea
                    id="content"
                    name="content"
                    value={article?.content}
                    disabled
                    className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary"
                    rows={5}
                  />
                </div>

                <div className="mt-4 w-full">
                  <div className="flex w-full flex-row items-center justify-between text-lg font-medium text-neutral">
                    <div>Tags</div>
                    <button
                      onClick={() => setNewTagList(assignedTagList)}
                      className="text-base text-gray-400 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="mt-3 flex w-full flex-row flex-wrap space-x-2">
                    {tagList.map((tag) => (
                      <button
                        key={tag.tagid}
                        onClick={() => {
                          if (newTagList.includes(tag.tagid)) {
                            setNewTagList(
                              newTagList.filter((t) => t !== tag.tagid),
                            );
                          } else {
                            setNewTagList([...newTagList, tag.tagid]);
                          }
                        }}
                        className={`flex items-center justify-center rounded border p-3 text-base transition-all duration-100 ${
                          !newTagList.includes(tag.tagid)
                            ? 'bg-white hover:bg-slate-100'
                            : 'bg-primary font-bold text-white hover:bg-primary-700'
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleUpdateArticle}
                theme="primary"
                variant="contained"
                width="fit"
              >
                Update Article
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
