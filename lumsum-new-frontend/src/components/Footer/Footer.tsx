import Button from "@/components/Button/Button";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import iconFacebook from "@/assets/images/socialmedia/facebook.png";
import iconInstagram from "@/assets/images/socialmedia/instagram.png";
import iconLinkedin from "@/assets/images/socialmedia/linkedin.png";
import * as S from "./Footer.styled";

const Footer = () => {
  return (
    <S.Footer>
      <S.FooterContainer>
        <S.LeftBlock>
          <Link href="/">
            <S.Logo>
              <S.LogoImgWrap>
                <Image src={Logo} alt="Logo" layout="fill" />
              </S.LogoImgWrap>
            </S.Logo>
          </Link>
          <S.Text>
            Lumsum is the go to marketplace for all your construction material
            needs. Whether you know what you need or not, our team is always
            here to support you with the choices, to ensure you get the best
            always.
          </S.Text>
          <S.Text>
            Copyright © 2020 Lumsum services LLC. All rights reserved.
          </S.Text>
        </S.LeftBlock>
        <S.RightBlock>
          <S.LinkGroup>
            <S.LinkHeader>Quick Links</S.LinkHeader>
            <S.LinkList>
              <S.LinkLi>
                <Link href="/account/profile">
                  <S.LinkA>My Account</S.LinkA>
                </Link>
              </S.LinkLi>
              <S.LinkLi>
                <Link href="/products">
                  <S.LinkA>Products</S.LinkA>
                </Link>
              </S.LinkLi>
              <S.LinkLi>
                <Link href="/suppliers">
                  <S.LinkA>Suppliers</S.LinkA>
                </Link>
              </S.LinkLi>
              <S.LinkLi>
                <Link href="/cart">
                  <S.LinkA>Cart</S.LinkA>
                </Link>
              </S.LinkLi>
              <S.LinkLi>
                <Link href="/blogs">
                  <S.LinkA>Blogs</S.LinkA>
                </Link>
              </S.LinkLi>
            </S.LinkList>
          </S.LinkGroup>
          <S.LinkGroup>
            <S.LinkHeader>Legals</S.LinkHeader>
            <S.LinkList>
              <S.LinkLi>
                <Link href="/privacy-policy">
                  <S.LinkA>Privacy Policy</S.LinkA>
                </Link>
              </S.LinkLi>
              <S.LinkLi>
                <Link href="/terms-of-use">
                  <S.LinkA>Terms &amp; Conditions</S.LinkA>
                </Link>
              </S.LinkLi>
              <S.LinkLi>
                <Link href="/faq">
                  <S.LinkA>FAQ's</S.LinkA>
                </Link>
              </S.LinkLi>
              <S.LinkLi>
                <Link href="/about-us">
                  <S.LinkA>About Us</S.LinkA>
                </Link>
              </S.LinkLi>
            </S.LinkList>
          </S.LinkGroup>
          <S.LinkGroup>
            <S.LinkHeader>Contacts</S.LinkHeader>
            <p>Feel free to get in touch with us via the following:</p>
            <S.ListLinearContactInfo>
              <S.ListLinearLiContactInfo>
                <a
                  title="Visit us in facebook"
                  href="https://www.facebook.com/lumSumUAE"
                  target="_blank"
                >
                  <S.ListLinearIconWrapContactInfo>
                    <Image src={iconFacebook} layout="fill" />
                  </S.ListLinearIconWrapContactInfo>
                </a>
              </S.ListLinearLiContactInfo>
              <S.ListLinearLiContactInfo>
                <a
                  title="Visit us in instagram"
                  href="https://www.instagram.com/lumsum_uae/"
                  target="_blank"
                >
                  <S.ListLinearIconWrapContactInfo>
                    <Image src={iconInstagram} layout="fill" />
                  </S.ListLinearIconWrapContactInfo>
                </a>
              </S.ListLinearLiContactInfo>
              <S.ListLinearLiContactInfo>
                <a
                  title="Visit us in LinkedIn"
                  href="https://www.linkedin.com/company/lumsum-services-fz-llc/"
                  target="_blank"
                >
                  <S.ListLinearIconWrapContactInfo>
                    <Image src={iconLinkedin} layout="fill" />
                  </S.ListLinearIconWrapContactInfo>
                </a>
              </S.ListLinearLiContactInfo>
            </S.ListLinearContactInfo>
            <S.LinkList>
              <S.LinkLi>
                <S.LinkA href="mail-to:info@lumsum.io" title="Mail us">
                  info@lumsum.io
                </S.LinkA>
              </S.LinkLi>
            </S.LinkList>
          </S.LinkGroup>
          <S.LinkGroup>
            <S.LinkHeader>Community</S.LinkHeader>
            <p>Get the latest news &amp; updates</p>
            <S.SubscribeForm>
              <S.inputFields
                type="text"
                placeholder="Your Email *"
                size="large"
              ></S.inputFields>
              <Button theme="primary" type="submit">
                Subscribe Now
              </Button>
            </S.SubscribeForm>
          </S.LinkGroup>
        </S.RightBlock>
      </S.FooterContainer>
    </S.Footer>
  );
};

export default Footer;
