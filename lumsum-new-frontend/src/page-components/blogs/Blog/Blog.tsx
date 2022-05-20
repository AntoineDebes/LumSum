import Head from "next/head";
import Image from "next/image";
import Container from "@/components/Container/Container";
import ContainerMainContent from "@/components/ContainerMainContent/ContainerMainContent";
import BlogFooter from "@/components/BlogFooter/BlogFooter";
import { blogData } from "@/cms-data/blog1";
import * as S from "./Blog.styled";

export const Blog: any = () => {
  return (
    <>
      <Head>
        <title>{blogData.header.title}</title>
        <meta name="description" content={blogData.header.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <S.ContainerBlog>
          <S.BlogHeader>
            <S.BlogImageWrap>
              <Image
                src={blogData.header.icon}
                alt={blogData.header.iconAlt}
                layout="fill"
                objectFit="cover"
              />
            </S.BlogImageWrap>
            <S.Title>{blogData.header.title}</S.Title>
          </S.BlogHeader>
          <ContainerMainContent>
            {/* need to update according to the specific cms output */}
            <section>
              <p>
                Lighting can never be overrated. Installing the perfect lighting
                fixtures can create a beautiful, functional space and boost
                productivity and comfort.
              </p>

              <p>
                However, this task can be quite daunting as we need to find a
                balance between both, the utilitarian and aesthetic values.
                Additionally, we can get overwhelmed with the hundreds of
                available options while trying to look for the right style,
                quality and budget.
              </p>

              <p>
                It becomes even more critical when choosing the lighting for our
                living room- the place where we will most likely be spending the
                majority of our time!
              </p>

              <p>
                Whether you are looking to install lighting fixtures into your
                new living room or replacing your old ones, this post will
                provide you with some guidelines on how to make the best
                choices.
              </p>

              <S.Title2>1.&nbsp;Learn about the types</S.Title2>

              <p>
                One misconception that usually accompanies the lighting task is
                to assume that one lighting type is enough. Here are 3 main
                lighting types to keep in mind:
              </p>

              <ul>
                <li>
                  <p>
                    <strong>Ambient lighting</strong>: It is the main source of
                    light that fills the majority of the room and usually comes
                    from recessed or overhead lighting.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Accent Lighting</strong>: It provides a more
                    aesthetically pleasing touch as it plays a role in
                    highlighting a specific focal point, mainly a decorative
                    element such as a piece of art.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Task lighting</strong>: As its name implies, it is
                    used to support a specific activity such as night reading or
                    desktop lighting.
                  </p>
                </li>
              </ul>

              <S.Title2>2.&nbsp;Explore the available categories</S.Title2>

              <p>
                Next, you will have to educate yourself on the different
                lighting categories:
              </p>

              <ul>
                <li>
                  <p>
                    <strong>Sconces</strong>: These are usually mounted on the
                    wall. Wall sconces can be placed on each side of a mirror
                    for example, while swing-arm scones are used as accent light
                    .
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Flush Mounts</strong>: They are fixed in the ceiling
                    and aim to brighten the room without occupying much space,
                    making them ideal for smaller rooms or rooms with a low
                    ceiling.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Pendants</strong>:&nbsp; They are rooted in the
                    ceiling but they differ from mounts in that they hang low
                    from the ceiling. They are usually used as task light and
                    have one light bulb only.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Chandeliers</strong>:&nbsp; It is a large lighting
                    system that suspends from the ceiling and gives different
                    light sources at the same time. They are popular for their
                    decorative use.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Lamps</strong>: They come in different styles and
                    sizes and are often used as task lighting.
                  </p>
                </li>
              </ul>

              <S.Title2>3.&nbsp;Determine the size</S.Title2>

              <p>
                It is very important to keep your living room properly lit and
                choose lighting fixtures that are proportional in size.
              </p>

              <p>
                While there are calculations that you can make to determine the
                size of your lighting, it can become a bit complicated. We
                recommend to go by the number of light bulbs in one fixture. So
                if your living room is relatively small, you can go with 3 light
                bulbs around 60 W in your ambient lighting, whereas if you have
                a relatively larger living room, you can go for 5 bulbs.
              </p>

              <S.Title2>4.&nbsp;Choose your Style</S.Title2>

              <p>
                It is highly recommended that the lighting complements the
                dominant element in your room such as the metal finishes,
                furniture or curtains so that it goes in line with your concept.
                However, if you have a very basic room design, you can choose a
                lighting style that adds a bold statement to your interior.
              </p>

              <S.Title2>Some additional&nbsp; tips</S.Title2>

              <p>
                After you have learned the basics on how to choose the lighting
                for your living room, it is important to remember that more
                light isn’t necessarily better, and that you should focus on
                quality rather than quantity. It is about putting light where it
                is really needed and matching &nbsp;it with the performed task
                in a specific location.
              </p>

              <p>
                Finally, do not forget about the natural light- alongside the
                artificial light- when designing your space!
              </p>
            </section>
          </ContainerMainContent>
          <BlogFooter
            suggestedLinks={blogData.suggestedLinks}
            articleLink={blogData.header.url}
          />
        </S.ContainerBlog>
      </Container>
    </>
  );
};
