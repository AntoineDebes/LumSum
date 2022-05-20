import * as S from "./MobilePreferenceBlock.styled";

import Button from "@/components/Button/Button";
import FILTER from "@/assets/images/filter.png";
import Image from "next/image";
import TextSwitchLink from "@/components/TextSwitchLink/TextSwitchLink";
import useFilterStore from "@/store/useFilterStore";

interface MobilePreferenceBlockProps {
  productsOrSuppliers: "products" | "suppliers";
}

const switchLabels = ["products", "suppliers"];

const MobilePreferenceBlock = ({
  productsOrSuppliers,
}: MobilePreferenceBlockProps) => {
  const displayFilter = useFilterStore((state) => state.showFilter);
  return (
    <S.MobilePreferenceBlock>
      <Button theme="ghostPrimary" onClick={() => displayFilter()}>
        <Image src={FILTER} width="14" height="14" />
        &nbsp;Preferences
      </Button>
      <TextSwitchLink labels={switchLabels} value={productsOrSuppliers} />
    </S.MobilePreferenceBlock>
  );
};

export default MobilePreferenceBlock;
