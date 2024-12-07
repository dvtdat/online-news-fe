import { createFileRoute, Link } from '@tanstack/react-router';
import * as React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { tagService } from '@/services/tag.service';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/stores/auth';
import { Tag } from '@/types';

export const Route = createFileRoute('/admin/tag/')({
  component: AdminTagPage,
});

function AdminTagPage() {
  const { userid } = useAuthStore();

  const [tagList, setTagList] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');

  const [isArticleManager, setIsArticleManager] = useState(false);

  useEffect(() => {
    const checkIfArticleManager = async () => {
      try {
        const result = await userService.isArticleManager(userid);
        if (result) {
          setIsArticleManager(true);
        }
      } catch (error) {
        console.error('Failed to check if user is article manager:', error);
      }
    };

    checkIfArticleManager();
  }, [userid]);

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

  const handleCreateTag = async () => {
    try {
      await tagService.create({
        name: newTagName,
        description: newTagDescription,
        articleManagerId: userid,
      });
    } catch (error) {
      console.error('Failed to create tag:', error);
    } finally {
      window.location.reload();
      setNewTagName('');
      setNewTagDescription('');
    }
  };

  const handleDeleteTag = async (tagId: number) => {
    try {
      await tagService.remove(tagId);
    } catch (error) {
      console.error('Failed to delete tag:', error);
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
              <p className="text-2xl font-bold text-primary">Create Tag</p>
            </div>
            <div className="mb-8 w-full overflow-hidden rounded-lg">
              <div className="mb-8 flex w-1/3 flex-col space-y-4">
                <div className="w-full">
                  <div className="w-full text-lg font-medium text-neutral">
                    Tag Name
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={newTagName}
                    disabled={!isArticleManager}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary "
                  />
                </div>

                <div className="w-full">
                  <div className="w-full text-lg font-medium text-neutral">
                    Description
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={newTagDescription}
                    disabled={!isArticleManager}
                    onChange={(e) => setNewTagDescription(e.target.value)}
                    className="mt-3 w-full rounded border bg-gray-100 p-3 text-base focus:border-primary "
                  />
                </div>
              </div>

              <Button
                onClick={handleCreateTag}
                theme="primary"
                variant="contained"
                width="fit"
                disabled={!isArticleManager}
              >
                Create Tag
              </Button>
            </div>

            <div className="mb-8 flex w-full flex-row items-center justify-between">
              <p className="text-2xl font-bold text-primary">Tag List</p>
            </div>
            <div className="w-full overflow-hidden rounded-lg">
              <div className="grid h-16 w-full grid-cols-12 gap-4 bg-primary text-xl font-bold text-white">
                <div className="flex flex-row items-center justify-center">
                  #
                </div>
                <div className="col-span-3 flex flex-row items-center justify-start">
                  Name
                </div>
                <div className="col-span-3 flex flex-row items-center justify-start">
                  Description
                </div>
                <div className="col-span-3 flex flex-row items-center justify-start">
                  Created At
                </div>
                <div className="col-span-2 flex flex-row items-center justify-start"></div>
              </div>
              {tagList.map((tag: Tag, index) => (
                <div
                  className="grid h-16 w-full grid-cols-12 gap-4 border-b bg-white transition-all duration-100 hover:bg-slate-100"
                  key={tag.tagid}
                >
                  <div className="flex flex-row items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="col-span-3 flex flex-row items-center justify-start">
                    {tag.name}
                  </div>
                  <div className="col-span-3 flex flex-row items-center justify-start">
                    {tag.description}
                  </div>
                  <div className="col-span-3 flex flex-row items-center justify-start">
                    {new Date(tag.createdat).toLocaleString()}
                  </div>
                  <div className="col-span-2 flex flex-row items-center justify-center">
                    <button
                      onClick={() => handleDeleteTag(tag.tagid)}
                      className="flex size-8 flex-row items-center justify-center rounded-lg bg-red text-2xl font-bold text-white"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
