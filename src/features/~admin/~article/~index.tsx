import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { articleService } from '@/services/article.service';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/stores/auth';
import { Article, ArticleStatus } from '@/types';

export const Route = createFileRoute('/admin/article/')({
  component: AdminArticlePage,
});

function AdminArticlePage() {
  const { userid, name } = useAuthStore();

  const [articleList, setArticleList] = useState<Article[]>([]);

  const [isArticleManager, setIsArticleManager] = useState(false);
  const [isWriter, setIsWriter] = useState(false);

  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');

  useEffect(() => {
    const checkIfArticleManager = async () => {
      try {
        const result = await userService.isArticleManager(userid);
        if (result.data) {
          setIsArticleManager(true);
        }
      } catch (error) {
        console.error('Failed to check if user is article manager:', error);
      }
    };

    const checkIfWriter = async () => {
      try {
        const result = await userService.isWriter(userid);
        if (result.data) {
          setIsWriter(true);
        }
      } catch (error) {
        console.error('Failed to check if user is writer:', error);
      }
    };

    checkIfArticleManager();
    checkIfWriter();
  }, [userid]);

  useEffect(() => {
    const fetchTagList = async () => {
      try {
        const fetchedArticleList = await articleService.getAll();
        setArticleList(fetchedArticleList?.data as unknown as Article[]);
      } catch (error) {
        console.error('Failed to fetch tag list:', error);
      }
    };

    fetchTagList();
  }, []);

  const handleCreateArticle = async () => {
    if (!isWriter) return;
    try {
      await articleService.create({
        title: newArticleTitle,
        content: newArticleContent,
        articleManagerId: userid,
        writerPenname: name,
      });
    } catch (error) {
      console.error('Failed to create article:', error);
    } finally {
      window.location.reload();
      setNewArticleTitle('');
      setNewArticleContent('');
    }
  };

  const handleDeleteArticle = async (articleId: number) => {
    try {
      await articleService.remove(articleId);
    } catch (error) {
      console.error('Failed to delete article:', error);
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
              <p className="text-2xl font-bold text-primary">Create Article</p>
            </div>
            <div className="mb-8 w-full overflow-hidden rounded-lg">
              <div className="mb-8 flex w-1/3 flex-col space-y-4">
                <div className="w-full">
                  <div className="w-full text-lg font-medium text-neutral">
                    Title
                  </div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={newArticleTitle}
                    disabled={!isWriter}
                    onChange={(e) => setNewArticleTitle(e.target.value)}
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
                    value={newArticleContent}
                    disabled={!isWriter}
                    onChange={(e) => setNewArticleContent(e.target.value)}
                    className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary"
                    rows={5}
                  />
                </div>
              </div>

              <Button
                onClick={handleCreateArticle}
                theme="primary"
                variant="contained"
                width="fit"
                disabled={!isArticleManager}
              >
                Create Article
              </Button>
            </div>

            <div className="mb-8 flex w-full flex-row items-center justify-between">
              <p className="text-2xl font-bold text-primary">Article List</p>
            </div>
            <div className="w-full overflow-hidden rounded-lg">
              <div className="grid h-16 w-full grid-cols-12 gap-4 bg-primary text-xl font-bold text-white">
                <div className="flex flex-row items-center justify-center">
                  #
                </div>
                <div className="col-span-2 flex flex-row items-center justify-start">
                  Title
                </div>
                <div className="col-span-2 flex flex-row items-center justify-start">
                  Writer
                </div>
                <div className="col-span-2 flex flex-row items-center justify-start">
                  Created At
                </div>
                <div className="col-span-2 flex flex-row items-center justify-start">
                  Published At
                </div>
                <div className="col-span-2 flex flex-row items-center justify-center">
                  Status
                </div>
                <div className="col-span-1 flex flex-row items-center justify-start"></div>
              </div>
              {articleList.map((article: Article, index) => (
                <Link
                  className="grid h-16 w-full grid-cols-12 gap-4 border-b bg-white transition-all duration-100 hover:bg-slate-100"
                  key={article.articleid}
                  to={`/admin/article/${article.articleid}`}
                >
                  <div className="flex flex-row items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-start">
                    {article.title}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-start">
                    {article.writerpenname}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-start">
                    {new Date(article.createdat).toLocaleString()}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-start">
                    {article.publishedat
                      ? new Date(article.publishedat).toLocaleString()
                      : 'Not published'}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-center">
                    {article.status === ArticleStatus.DRAFT ? (
                      <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-gray-400 font-bold text-white">
                        Draft
                      </div>
                    ) : article.status === ArticleStatus.PENDING ? (
                      <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-yellow font-bold text-white">
                        Pending
                      </div>
                    ) : article.status === ArticleStatus.APPROVED ? (
                      <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-green font-bold text-white">
                        Approved
                      </div>
                    ) : (
                      <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-red font-bold text-white">
                        Rejected
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 flex flex-row items-center justify-center">
                    <button
                      onClick={() => handleDeleteArticle(article.articleid)}
                      className="z-10 flex size-8 flex-row items-center justify-center rounded-lg bg-red text-2xl font-bold text-white"
                    >
                      X
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
