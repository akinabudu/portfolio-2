import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import TagCloud from '../components/TagCloud/TagCloud';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';
import Link from '../components/Link/Link';

interface AboutProps {
  slugs: string[];
}

const About: NextPage<AboutProps> = ({ slugs }) => {
  return (
    <Page title="About" description="About me">
      <AnimatedTitle title="Me, Myself and I" />
      <div className="container mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4">
          <p>
            I&apos;m a passionated frontend developer currently working for{' '}
            <Link href="https://thalia-drs.de" target="_blank">
              Thalia drs
            </Link>
            .
          </p>

          <p>
            After graduating in 2012 with a Bachelor&apos;s Degree in Applied
            Computer Sciences, I moved to Berlin and spent the years afterwards
            working as frontend developer as part of multiple teams in various
            companies.
          </p>

          <p>
            Since 2020 I work as Web Frontend Tech Lead to gain and share more
            of my technical knowledge, be a consultant to our clients and
            product owners and keep our teams on track.
          </p>

          <p>
            I spend my free time reading, cooking, working in my garden spot and
            going on travel adventures whenever I&apos;m not writing code.
          </p>

          <p>
            Haven&apos;t heard enough of me?{' '}
            <Link
              href='mailto:"Guido Lange"<guidolange90@gmail.com>'
              target="_blank"
            >
              Contact me!
            </Link>
          </p>
        </div>
        <TagCloud tags={slugs} />
      </div>
    </Page>
  );
};

export const getStaticProps = () => {
  const slugString = process.env.SLUGS || '';

  return {
    props: {
      slugs: slugString.split(','),
    },
  };
};

export default About;
