import * as S from "./BlogFooter.styled";
import Link from "next/link";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

interface BlogFooterProps {
  suggestedLinks: {
    title: string,
    url: string,
  }[];
  articleLink: string,
}

const BlogFooter = ({ suggestedLinks, articleLink }: BlogFooterProps) => {
  return (
    <S.BlogFooter>
      <S.Title>
        Check out on lumsum.io the supplier that will help you choose right:
      </S.Title>
      {
        suggestedLinks.map(link => {
          return (
            <Link href={link.url} key={link.url}>
              <S.SuggestedLinks>
                {link.title}
              </S.SuggestedLinks>
            </Link>
          )
        })
      }
      <S.LinkShareBlock>
        <S.LinkShareTitle>Share</S.LinkShareTitle>
        <S.LinkList>
          <FacebookShareButton url={articleLink}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={articleLink}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton url={articleLink}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </S.LinkList>
      </S.LinkShareBlock>
    </S.BlogFooter>
  );
};

export default BlogFooter;
