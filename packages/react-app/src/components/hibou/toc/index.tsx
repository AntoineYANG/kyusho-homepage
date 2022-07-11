/*
 * @Author: Kanata You 
 * @Date: 2022-07-11 14:42:35 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 22:45:51
 */

import i18n from '@locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import colors from '../colors';


const TOCElement = styled.div({
  fontSize: '0.75rem',
  lineHeight: '1.3em',
  marginBlock: '20px',
  paddingBlockStart: '1.2em',
  paddingBlockEnd: '1.6em',
  paddingInline: 0,
  boxShadow: `
    0 6px 8px 0 ${colors.shadow}20
  `,
});

const TOCGroup = styled.ul({
  listStyleType: 'none',
  marginBlock: 0,
  paddingInlineStart: 0,
  opacity: 0.95,
});

const TOCItemElement = styled.li({
  paddingInlineStart: '1em',
  letterSpacing: '0.03em',
  lineHeight: '1.6em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline',
  backgroundImage: `
    linear-gradient(90deg,
      transparent 1.75em,
      ${colors.border}60 1.75em,
      ${colors.border}60 1.85em,
      transparent 1.85em
    )
  `,
});

const TOCHeader = styled.a<{ inView: boolean }>(({ inView }) => ({
  textDecoration: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  outline: 'none',
  marginBlock: '0.1em',
  paddingInlineEnd: '1em',
  minWidth: '2em',

  '&#highlight-toc-item': {
    fontWeight: inView ? 'bolder' : undefined,

    '::before': {
      opacity: inView ? 0.6 : 0.2,
    },
  },

  '::before': {
    flexGrow: 0,
    flexShrink: 0,
    content: '"\u25cf"',
    display: 'block',
    textAlign: 'center',
    width: '1.6em',
    opacity: 0.2,
  },

  ':focus, :hover': {
    fontWeight: 'bolder',
  },

  ':focus::before': {
    opacity: 0.8,
  },

  ':hover::before': {
    opacity: 0.7,
  },
}));

type TOCItem = {
  header: HTMLElement;
  children?: TOCItem[] | undefined;
};

const TOCPiece: React.FC<TOCItem> = React.memo(function TOCPiece ({
  header,
  children,
}) {
  const name = header.innerText;

  const scrollToHeader = React.useCallback((e: { target: any }) => {
    (e.target as HTMLElement)?.blur?.();

    header.scrollIntoView({
      behavior: 'smooth',
    });

    header.focus();
  }, [header]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      scrollToHeader(e);
    }
  }, [scrollToHeader]);

  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const cb: IntersectionObserverCallback = ([e]) => {
      if (e) {
        setInView(e.intersectionRatio >= 0.2);
      }
    };

    const observer = new IntersectionObserver(cb, {
      threshold: [0.2],
    });

    observer.observe(header);

    return () => observer.disconnect();
  }, [header]);

  const classNameRef = React.useRef<string>();

  React.useEffect(() => {
    if (inView && classNameRef.current) {
      const allLinks = document.querySelectorAll(
        classNameRef.current.split(' ').map(d => `.${d}`).join('')
      );

      // only highlight the first element

      (allLinks[0] as HTMLAnchorElement).id = 'highlight-toc-item';

      for (let i = 1; i < allLinks.length; i += 1) {
        (allLinks[i] as HTMLAnchorElement).id = '';
      }
    }
  }, [inView]);

  return (
    <TOCItemElement>
      <TOCHeader
        role="link"
        tabIndex={0}
        inView={inView}
        onClick={scrollToHeader}
        onKeyDown={handleKeyDown}
        ref={e => {
          if (e) {
            classNameRef.current = e.className;
          }
        }}
      >
        {name}
      </TOCHeader>
      {
        children?.length ? (
          <TOCGroup>
            {
              children.map((c, i) => (
                <TOCPiece
                  {...c}
                  key={i}
                />
              ))
            }
          </TOCGroup>
        ) : null
      }
    </TOCItemElement>
  );
});

const TOC: React.FC<{ items: TOCItem[] }> = React.memo(function TOC ({
  items,
}) {
  return (
    <TOCElement>
      <TOCGroup>
        {
          items.map((d, i) => (
            <TOCPiece
              key={i}
              header={d.header}
              children={d.children}
            />
          ))
        }
      </TOCGroup>
    </TOCElement>
  );
});

const TOCAreaElement = styled.div({
  margin: '0 !important',
  padding: '0 !important',
  border: 'none !important',
});

interface TOCAreaProps {
  onChange: (items: TOCItem[]) => void;
  children: JSX.Element | JSX.Element[];
}

const isHeader = (e: HTMLElement) => (
  /^(HEADER)|(H[1-6])$/.test(e.tagName)
  || (e as { role?: React.AriaRole | undefined }).role === 'heading'
  || /^\d+$/.test(e.ariaLevel ?? '')
);

const resolveTOC = (root: HTMLElement): TOCItem[] => {
  const items: TOCItem[] = [];

  let block: TOCItem | null = null;

  for (const child of root.children) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }

    if (isHeader(child)) {
      if (block) {
        items.push(block);
      }

      block = {
        header: child,
        children: [],
      };
    } else if (child.hasChildNodes()) {
      (block?.children ?? items).push(...resolveTOC(child));
    }
  }

  if (block) {
    items.push(block);
  }

  return items;
};

const TOCArea: React.FC<TOCAreaProps> = React.memo(function TOCArea ({
  children,
  onChange,
}) {
  const areaRef = React.useRef<HTMLDivElement>();

  // make it update when the language changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t: _t } = useTranslation();

  React.useLayoutEffect(() => {
    if (!areaRef.current) {
      return;
    }

    const update = () => {
      if (areaRef.current) {
        onChange(resolveTOC(areaRef.current));
      }
    };

    update();

    const observer = new MutationObserver(update);

    observer.observe(areaRef.current, {
      childList: true,
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, i18n.language]);

  return (
    <TOCAreaElement
      ref={e => e && [areaRef.current = e]}
    >
      {children}
    </TOCAreaElement>
  );
});

export type TOCHandler = {
  ELEMENT: React.FC;
  WATCH: React.FC<{ children: JSX.Element | JSX.Element[] }>;
};

export const useTOC = (): TOCHandler => {
  const [items, setItems] = React.useState<TOCItem[]>([]);

  const handleChange = React.useCallback((_items: TOCItem[]) => {
    setItems(_items);
  }, []);

  const LocalTOCArea: React.FC<{ children: JSX.Element | JSX.Element[] }> = React.useCallback(
    function LocalTOCArea ({ children }) {
      return (
        <TOCArea
          onChange={handleChange}
        >
          {children}
        </TOCArea>
      );
    },
    [handleChange]
  );

  const LocalTOC: React.FC = React.useCallback(function LocalTOC () {
    return (
      <TOC
        items={items}
      />
    );
  }, [items]);

  return {
    ELEMENT: LocalTOC,
    WATCH: LocalTOCArea,
  };
};
