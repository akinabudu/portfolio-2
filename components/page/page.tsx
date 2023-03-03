import type { HTMLProps } from 'react';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import * as process from 'process';
import useSanityImage from 'hooks/useSanityImage';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { useRouter } from 'next/router';

interface PageProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  fullHeight?: boolean;
  openGraphImage?: SanityImageObject;
  description?: string;
  slug?: string;
  type?: string;
  publishedTime?: string;
}

const Page = ({
  fullHeight,
  title,
  openGraphImage,
  className,
  description,
  slug,
  type,
  publishedTime,
  ...props
}: PageProps) => {
  const ogImage = useSanityImage(openGraphImage)?.src || null;
  const { pathname } = useRouter();

  const url = `${process.env.NEXT_PUBLIC_URL}${
    slug ? slug : pathname === '/' ? '' : pathname
  }`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title: `${title} | ${process.env.NEXT_PUBLIC_NAME}`,
          description,
          url,
          type: type || 'website',
          ...(type === 'article'
            ? {
                article: {
                  publishedTime,
                },
              }
            : {}),
          images: ogImage
            ? [
                {
                  url: ogImage,
                  height: 600,
                  width: 800,
                  alt: `Open Graph image - ${title}`,
                },
              ]
            : undefined,
        }}
      />
      <div
        {...props}
        className={clsx(
          'container mx-auto max-w-screen-lg px-4 md:px-8',
          fullHeight
            ? 'flex h-full flex-col justify-center'
            : 'mt-4 mb-6 md:mt-12',
          className,
        )}
      />
    </>
  );
};

export default Page;