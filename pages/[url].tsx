import { url } from "inspector";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Url(context: { originalUrl: string }) {
  const router = useRouter();

  useEffect(() => {
    router.push(context.originalUrl);
  }, [router, context]);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const url = params?.url;

  const response = await fetch(`http://localhost:3000/api/${url}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(response);
  const data = await response.json();
  console.log(data);
  return {
    props: data,
  };
};
