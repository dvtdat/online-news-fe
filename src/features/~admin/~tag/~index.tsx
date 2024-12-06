import { createFileRoute, Link } from '@tanstack/react-router';
import * as React from 'react';
import { useState, useEffect } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { tagService } from '@/services/tag.service';
import { Tag } from '@/types';

export const Route = createFileRoute('/admin/tag/')({
  component: AdminTagPage,
});

function AdminTagPage() {
  const [tagList, setTagList] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTagList = async () => {
      try {
        const fetchedTagList = await tagService.getAll();
        setTagList(fetchedTagList?.data as unknown as Tag[]);
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
              <p className="text-2xl font-bold text-primary">Tag List</p>
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
                <div className="col-span-3 flex flex-row items-center justify-start">
                  Name
                </div>
                <div className="col-span-5 flex flex-row items-center justify-start">
                  Description
                </div>
                <div className="col-span-3 flex flex-row items-center justify-start">
                  Created At
                </div>
              </div>
              {tagList.map((tag: Tag, index) => (
                <Link
                  className="grid h-16 w-full grid-cols-12 gap-4 border-b bg-white transition-all duration-100 hover:bg-slate-100"
                  key={tag.id}
                  to={`/tag/${tag.id}`}
                >
                  <div className="flex flex-row items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="col-span-3 flex flex-row items-center justify-start">
                    {tag.name}
                  </div>
                  <div className="col-span-5 flex flex-row items-center justify-start">
                    {tag.description}
                  </div>
                  <div className="col-span-3 flex flex-row items-center justify-start">
                    {new Date(tag.createdat).toLocaleString()}
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
