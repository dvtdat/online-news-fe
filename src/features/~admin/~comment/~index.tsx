import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { commentService } from '@/services/comment.service';
import { Comment } from '@/types';
// import { Article, ArticleStatus } from '@/types';
export const Route = createFileRoute('/admin/comment/')({
  component: AdminCommentPage,
});

function AdminCommentPage() {
  // const [articleList, setArticleList] = useState<Article[]>([]);
  const [commentList, setCommentList] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchTagList = async () => {
      try {
        const fetchedArticleList = await commentService.getAll();
        setCommentList(fetchedArticleList?.data as unknown as Comment[]);
      } catch (error) {
        console.error('Failed to fetch tag list:', error);
      }
    };

    fetchTagList();
  }, []);

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
              <p className="text-2xl font-bold text-primary">Article List</p>
              {/* <Button
                onClick={handleCreate}
                theme="primary"
                variant="contained"
                width="fit"
              >
                Create Allocate Session
              </Button> */}
            </div>
            <div className="w-full overflow-hidden rounded-lg">
              <div className="grid h-16 w-full grid-cols-12 gap-4 bg-primary text-xl font-bold text-white">
                <div className="flex flex-row items-center justify-center">
                  #
                </div>
                <div className="flex flex-row items-center justify-center">
                  Article
                </div>
                <div className="col-span-2 flex flex-row items-center justify-center">
                  Author
                </div>
                <div className="col-span-2 flex flex-row items-center justify-start">
                  Created At
                </div>
                <div className="col-span-6 flex flex-row items-center justify-center">
                  Status
                </div>
              </div>
              {commentList.map((comment: Comment, index) => (
                <Link
                  className="grid h-16 w-full grid-cols-12 gap-4 border-b bg-white transition-all duration-100 hover:bg-slate-100"
                  key={comment.id}
                  to={`/admin/comment/${comment.id}`}
                >
                  <div className="flex flex-row items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    {comment.articleid}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-center">
                    {comment.guestid}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-start">
                    {new Date(comment.createdat).toLocaleString()}
                  </div>
                  <div className="col-span-6 flex flex-row items-center justify-center">
                    {comment.isapproved ? (
                      <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-green font-bold text-white">
                        Approved
                      </div>
                    ) : (
                      <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-red font-bold text-white">
                        Rejected
                      </div>
                    )}
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
