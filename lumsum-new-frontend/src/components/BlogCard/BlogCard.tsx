import * as S from "./BlogCard.styled";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  icon: string;
  iconAlt: string;
  url: string;
  width?: string;
}

const BlogCard = ({ title, icon, iconAlt, url, width, ...props }: BlogCardProps) => {
  return (
    <S.BlogCard width={width} {...props}>
      <Link href={url}>
        <a title={title}>
          <S.ImageWrap>
            <Image src={icon} alt={iconAlt} layout="fill" />
          </S.ImageWrap>
          <S.Title>
            {title}
          </S.Title>
        </a>
      </Link>
    </S.BlogCard>
  );
};

export default BlogCard;
