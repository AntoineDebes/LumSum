import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import SupplierInfoMinimal from "@/components/SupplierInfoMinimal/SupplierInfoMinimal";
import TagList from "@/components/TagList/TagList";
import RatingOverview from "@/components/RatingOverview/RatingOverview";

export const SupplierOverViewHead = styled(SupplierInfoMinimal)`
  margin-bottom: 1.875em;
`;

export const BrandList = styled(TagList)`
  margin-top: 1em;
`;

export const InnerWrap = styled.div`
  max-width: 34rem;
`;

export const InfoBlock = styled.div`
  & + & {
    margin-top: 1.25em;
  }
`;

export const SubTitle1 = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  margin-bottom: 0.75em;
`;

export const SubTitle2 = styled.h4`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColorDarker3};
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 700;
  line-height: 1.5;
`;

export const TextSmall = styled(Text)`
  font-size: 0.8125rem;
`;

// ratings style

export const SummaryRatingOverview = styled(RatingOverview)`
  margin-bottom: 1.25rem;
`;

//

export const Slider = styled.div`
  /* width: 983px; */
  height: auto;
`;

// contact box

export const ListContactInfo = styled.ul`
  font-size: 1rem;
  margin-bottom: 0;
`;

export const ListLiContactInfo = styled.li`
  margin-bottom: 0.75em;

  &:last-child {
    margin-bottom: 0;
  }

  a {
    display: flex;
    align-items: center;
  }
`;

export const LinkContactInfo = styled(Link);

export const LinkAContactInfo = styled.a;

export const IconWrapContactInfo = styled.div`
  position: relative;
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.75em;
`;

export const IconContactInfo = styled(Image)``;

export const TextContactInfo = styled.h5`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1em;
`;

export const ListLinearContactInfo = styled.ul`
  display: flex;
  font-size: 1.5rem;
`;

export const ListLinearLiContactInfo = styled.li`
  margin-right: 0.25em;
`;

export const ListLinearIconWrapContactInfo = styled(IconWrapContactInfo)`
  margin: 0;
`;
