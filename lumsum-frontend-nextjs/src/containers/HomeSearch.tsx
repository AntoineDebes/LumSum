import React, { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { SearchOutlined } from "@ant-design/icons";
import styles from "../styles/HomeSearch.module.scss";

const HomeSearch = () => {
    const router = useRouter();
    // const [city, setCity] = useState<string>("ALL UAE");
    const [whatAreYouLookingFor, setWhatAreYouLookingFor] = useState<string>("");
    const onSearch = (event: any) => {
        event.preventDefault();
        router.push({
            pathname: "/search",
            search: `what_are_you_looking_for=${encodeURIComponent(whatAreYouLookingFor)}`,
        });
    };

    const validateSearch = (event) => {
        const regex = new RegExp("^[a-zA-Z0-9\b]+$");
        const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }



    return (
        <div className={clsx("container", styles.background)}>
            <div className="inner">
                <h2 className={styles.title2}>FIND YOUR</h2>
                <h1 className={styles.title3}>SUPPLIERS</h1>
                <h2 className={styles.title4}>UAE Supplier Directory</h2>
                <p className={styles.title5}>The most comprehensive directory of UAE's engineering companies &amp; suppliers</p>
                <div className={styles.homeSearchFormContainer}>
                    <form className={styles.homeSearchForm}>
                        {/* <HomeSearch.SelectContainer>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" />
                        <HomeSearch.Select onChange={(event) => setCity(event.target.value)}>
                            {cities.map((city: any, index: number) => (
                                <option key={index} value={city.value}>{city.name}</option>
                            ))}
                        </HomeSearch.Select>
                    </HomeSearch.SelectContainer> */}
                        <input
                            type="search"
                            onKeyPress={validateSearch}
                            className={styles.inputSearch}
                            placeholder="What are you looking for?"
                            onChange={(event) => setWhatAreYouLookingFor(event.target.value)}
                        />
                        <button className={styles.searchButton} onClick={onSearch}>
                            <span>Search</span> <SearchOutlined className={styles.searchIcon} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
