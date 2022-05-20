import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import highlightWords from "highlight-words";
import iconSearch from "@/assets/images/search.svg";
import * as S from "./PrimarySearch.styled";

import { searchResults } from "@/dummy-data/searchResults";

interface ResultsPanelProps { }

const PrimarySearch = ({ }: ResultsPanelProps) => {
  const [showSearchResults, setShowSearchResults] = useState(true);
  const ref: any = useRef();

  useEffect(() => {
    const searchBar = document.getElementById("primary-searchbox");

    const handleClick = (e: any) => {
      if (ref.current?.contains(e.target) || searchBar?.contains(e.target)) {
        setShowSearchResults(true);
      } else {
        setShowSearchResults(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showSearchResults]);

  const [searchTerm, setSearchTerm] = useState("");

  const matchingList = searchResults.map((category) => {
    return {
      title: category.title,
      url: category.url,
      items: category.items.filter((element) =>
        element.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    };
  });

  return (
    <S.primarySearch>
      <S.searchboxWrap>
        <S.searchboxLabel htmlFor="primary-searchbox">
          <S.IconWrap>
            <Image src={iconSearch} alt="menu" layout="fill" />
          </S.IconWrap>
        </S.searchboxLabel>
        <S.primarySearchInput
          id="primary-searchbox"
          size="large"
          placeholder="Search products and suppliers"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </S.searchboxWrap>
      {searchTerm && showSearchResults && (
        <S.resultsPanel ref={ref}>
          {matchingList.map((result) => {
            return (
              <S.resultsSubPanel key={result.title}>
                <h5>{`Matching ${result.title}`}</h5>
                {result.items.length ? (
                  <S.resultsList>
                    {result.items.map((item) => {
                      return (
                        <S.resultsListLi key={result.url}>
                          <Link href={result.url}>
                            <a>
                              {highlightWords({
                                text: item,
                                query: searchTerm,
                              }).map(({ text, match, key }) =>
                                match ? (
                                  <S.resultHighlight
                                    className="highlight"
                                    key={key}
                                  >
                                    {text}
                                  </S.resultHighlight>
                                ) : (
                                  <span key={key}>{text}</span>
                                )
                              )}
                            </a>
                          </Link>
                        </S.resultsListLi>
                      );
                    })}
                  </S.resultsList>
                ) : (
                  <p>No {result.title} matching the keyword</p>
                )}
              </S.resultsSubPanel>
            );
          })}
        </S.resultsPanel>
      )}
    </S.primarySearch>
  );
};

export default PrimarySearch;
