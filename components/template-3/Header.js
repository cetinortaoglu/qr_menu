import Head from "next/head";
import React, { useState } from "react";
import SearchInput from "../search";
export default function Header({ leftIcon, account, list, paramsId }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <Head>
        <title>Anasayfa</title>
        <meta
          name="description"
          content="Next.js ile oluşturulmuş bir anasayfa"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="h-auto bg-cover bg-center p-4"
        style={{ backgroundImage: `url("/images/HeaderBgg.jpeg")` }}
      >
        <div className="flex justify-between">
          <div className="text-white cursor-pointer">{leftIcon}</div>
          <div className="text-white cursor-pointer z-10">
            <SearchInput
              query={query}
              setQuery={setQuery}
              inputProducts={list}
              paramsId={paramsId}
            />
          </div>
        </div>
        <div className="flex justify-center align-middle">
          <img
            src={account?.brand_logo}
            className="bg-cover bg-center my-8"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
