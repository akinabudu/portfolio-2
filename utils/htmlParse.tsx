import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  domToReact
} from 'html-react-parser';
import Link from '../components/Link/Link';

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode instanceof Element) {
      if (domNode.name === 'a') {
        return (
          <Link
            href={domNode.attribs.href}
            target={domNode.attribs.target ?? '_blank'}
          >
            {domToReact(domNode.children)}
          </Link>
        );
      }
      return domNode;
    }
    return domNode;
  },
};

export const parseHtml = (html: string) => parse(html, options);