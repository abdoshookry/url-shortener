import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

export default function Clicks(context: {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          URL Shortener
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full  sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="break-all">
                <div className="font-medium  ">
                  <span className="text-indigo-600"> original URL:</span>{" "}
                  {context.originalUrl}
                </div>
                <div className="font-medium ">
                  <span className="text-indigo-600">short URL code: </span>
                  {context.shortUrl}
                </div>
                <div className="font-medium ">
                  <span className="text-indigo-600">number of clicks: </span>
                  {context.clicks}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const url = params?.url;

  const response = await fetch(`http://localhost:3000/api/clicks/${url}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(response);
  const data = await response.json();
  // console.log(data);
  return {
    props: data,
  };
};
