import { Story as IStory } from "@/@types/schema";
import dayjs from "dayjs";
import React from "react";

const Story = (props: IStory) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {props?.image?.[0]?.file.url && (
        <img
          className="w-full h-full"
          src={props?.image?.[0]?.file.url}
          alt="banner"
        />
      )}
      <div className="flex gap-5 items-center">
        <img
          className="rounded-t-lg"
          src={props?.title?.avatar_url ?? "/docs/images/blog/image-1.jpg"}
          alt="avatar"
        />
        <div className="flex flex-col">
          <h5 className="mb-2 font-bold text-gray-900 dark:text-white">
            {props?.title?.name}
          </h5>
          <h5 className="mb-2 font-bold text-gray-900 dark:text-white">
            {props?.title?.person.email}
          </h5>
        </div>
      </div>
      <div className="p-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div>
          <div className="mb-5">
            <p className="italic text-xs">
              Created:{" "}
              {dayjs(props.date.created_time).format(
                "dddd, MMMM D, YYYY h:mm A"
              )}
            </p>
          </div>
          <a
            href={props?.slug?.[0] ?? "#"}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Story;
