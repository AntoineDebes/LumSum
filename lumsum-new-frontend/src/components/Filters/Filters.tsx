import { RadioChangeEvent } from "antd";
import Image from "next/image";
import useFilterStore from "@/store/useFilterStore";
import TextSwitchLink from "@/components/TextSwitchLink/TextSwitchLink";
import MinMaxInput from "@/components/MinMaxInput/MinMaxInput";
import Rating from "@/components/Rating/Rating";
import { Select } from "antd";
const { Option } = Select;
import * as S from "./Filters.styled";
import CLOSEDARK from "@/assets/images/closeDark.png";
import { brands, categories } from "@/dummy-data/filters";
import { ReactNode } from "react";
import { SelectValue } from "antd/lib/select";

interface FiltersProps {
  visible?: boolean;
  productsOrSuppliers: string;
}

interface activeProductFiltersType {
  productRating: number;
  supplierRating: number;
  minPrice: number;
  maxPrice: number;
  brands: string[];
};

const Filters = ({ productsOrSuppliers, visible, ...props }: FiltersProps) => {
  // hiding filter in mobile view
  const switchLabels = ["products", "suppliers"];
  const removeFilter = useFilterStore((state) => state.hideFilter);

  const activeProductFilters = useFilterStore(
    (state) => state.activeProductFilters
  );

  const activeSupplierFilters = useFilterStore(
    (state) => state.activeSupplierFilters
  );

  const updateProductRating = useFilterStore(
    (state) => state.updateProductRating
  );
  const productRatingValue = useFilterStore(
    (state) => state.activeProductFilters.productRating
  );
  const onProductRatingChange = (e: RadioChangeEvent) => {
    updateProductRating(e.target.value);
  };

  const updateSupplierRating = useFilterStore(
    (state) => state.updateSupplierRating
  );
  const supplierRatingValue = useFilterStore(
    (state) => state.activeProductFilters.supplierRating
  );
  const onSupplierRatingChange = (e: RadioChangeEvent) => {
    updateSupplierRating(e.target.value);
  };

  const minPrice = useFilterStore(
    (state) => state.activeProductFilters.minPrice
  );
  const maxPrice = useFilterStore(
    (state) => state.activeProductFilters.maxPrice
  );
  const updateMinPrice = useFilterStore((state) => state.updateMinPrice);
  const updateMaxPrice = useFilterStore((state) => state.updateMaxPrice);
  const handleMinPriceChange = (e: { target: { value: any } }) => {
    const regEx = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === "" || regEx.test(value)) {
      updateMinPrice(parseInt(value));
    }
  };
  const handleMaxPriceChange = (e: { target: { value: any } }) => {
    const regEx = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === "" || regEx.test(value)) {
      updateMaxPrice(parseInt(value));
    }
  };

  const selectedBrands = useFilterStore(
    (state) => state.activeProductFilters.brands
  );
  const updateBrands = useFilterStore((state) => state.updateBrands);
  const brandsList: ReactNode[] = [];
  brands.map((brand) => {
    brandsList.push(
      <Option value={brand.value} key={brand.value}>
        {brand.value}
      </Option>
    );
  });
  const brandListChange: any = (value: string[]) => {
    updateBrands(value);
  };

  const selectedCategories = useFilterStore(
    (state) => state.activeSupplierFilters.categories
  );
  const updateCategories = useFilterStore((state) => state.updateCategories);
  const categoriesList: ReactNode[] = [];
  categories.map((category) => {
    categoriesList.push(
      <Option value={category.value} key={category.value}>
        {category.value}
      </Option>
    );
  });
  const categoryListChange: any = (value: string[]) => {
    updateCategories(value);
  };

  const filtersApplied = (activeProductFilters: activeProductFiltersType) => {
    let count = 0;
    for (const [key, value] of Object.entries(activeProductFilters)) {
      (value > 0) || value.length ? count++ : count;
    }
    return count;
  };

  const clearAllFilters = useFilterStore((state) => state.clearAllFilters);

  const clearFilters = () => {
    clearAllFilters();
  };

  return (
    <S.Filters {...props}>
      <S.FilterBlock hiddenBelowIpad={true}>
        <TextSwitchLink labels={switchLabels} value={productsOrSuppliers} />
      </S.FilterBlock>
      <S.FilterHeader>
        <S.FilterTitleWrap>
          <S.FilterTitle>Filters</S.FilterTitle>
          <S.FilterSubtitle>
            {filtersApplied(activeProductFilters)} filter
            {filtersApplied(activeProductFilters) !== 1 && "s"}
          </S.FilterSubtitle>
        </S.FilterTitleWrap>
        <S.FilterClear theme="ghost" onClick={clearFilters}>
          Clear all
        </S.FilterClear>
        <S.CloseFilter
          theme="plain"
          title="Close Filter"
          onClick={() => removeFilter()}
        >
          <Image src={CLOSEDARK} width="18" height="18" />
        </S.CloseFilter>
      </S.FilterHeader>
      {productsOrSuppliers === "products" ? (
        <>
          <S.FilterBlock>
            <S.FilterBlockTitle>Product Rating</S.FilterBlockTitle>
            <Rating
              onChange={onProductRatingChange}
              value={productRatingValue}
            />
          </S.FilterBlock>
          <S.FilterBlock>
            <S.FilterBlockTitle>Supplier Rating</S.FilterBlockTitle>
            <Rating
              onChange={onSupplierRatingChange}
              value={supplierRatingValue}
            />
          </S.FilterBlock>
          <S.FilterBlock>
            <S.FilterBlockTitle>Price AED</S.FilterBlockTitle>
            <MinMaxInput
              minPrice={minPrice}
              maxPrice={maxPrice}
              handleMinPriceChange={handleMinPriceChange}
              handleMaxPriceChange={handleMaxPriceChange}
            />
          </S.FilterBlock>
          <S.FilterBlock>
            <S.FilterBlockTitle>Brands</S.FilterBlockTitle>
            <S.SearchableList
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              value={selectedBrands}
              onChange={brandListChange}
              placeholder="Any"
            >
              {brandsList}
            </S.SearchableList>
          </S.FilterBlock>
        </>
      ) : (
        <>
          <S.FilterBlock>
            <S.FilterBlockTitle>Rating</S.FilterBlockTitle>
            <Rating
              onChange={onSupplierRatingChange}
              value={supplierRatingValue}
            />
          </S.FilterBlock>
          <S.FilterBlock>
            <S.FilterBlockTitle>Brands</S.FilterBlockTitle>
            <S.SearchableList
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              value={selectedBrands}
              onChange={brandListChange}
              placeholder="Any"
            >
              {brandsList}
            </S.SearchableList>
          </S.FilterBlock>
          <S.FilterBlock>
            <S.FilterBlockTitle>Categories</S.FilterBlockTitle>
            <S.SearchableList
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              value={selectedCategories}
              onChange={categoryListChange}
              placeholder="Any"
            >
              {categoriesList}
            </S.SearchableList>
          </S.FilterBlock>
        </>
      )}
    </S.Filters>
  );
};

export default Filters;
