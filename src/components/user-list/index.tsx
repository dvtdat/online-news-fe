import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { userService } from '@/services/user.service';
import { User } from '@/types';

const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const fetchedUserList = await userService.getAll();
        setUserList(fetchedUserList?.data as unknown as User[]);
      } catch (error) {
        console.error('Failed to fetch user list:', error);
      }
    };

    fetchUserList();
  }, []);

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg">
        <div className="grid h-16 w-full grid-cols-12 gap-4 bg-primary text-xl font-bold text-white">
          <div className="flex flex-row items-center justify-center">#</div>
          <div className="col-span-3 flex flex-row items-center justify-start">
            Name
          </div>
          <div className="col-span-2 flex flex-row items-center justify-start">
            Username
          </div>
          <div className="col-span-3 flex flex-row items-center justify-start">
            Email
          </div>
          <div className="col-span-3 flex flex-row items-center justify-start">
            Created At
          </div>
        </div>
        {userList.map((user: User, index) => (
          <Link
            className="grid h-16 w-full grid-cols-12 gap-4 border-b bg-white transition-all duration-100 hover:bg-slate-100"
            key={user.userid}
            to={`/user/${user.userid}`}
          >
            <div className="flex flex-row items-center justify-center">
              {index + 1}
            </div>
            <div className="col-span-3 flex flex-row items-center justify-start">
              {user.name}
            </div>
            <div className="col-span-2 flex flex-row items-center justify-start">
              {user.username}
            </div>
            <div className="col-span-3 flex flex-row items-center justify-start">
              {user.email}
            </div>
            <div className="col-span-3 flex flex-row items-center justify-start">
              {new Date(user.createdat).toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default UserList;
