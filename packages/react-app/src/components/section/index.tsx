/*
 * @Author: Kanata You 
 * @Date: 2022-07-11 12:53:45 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 16:54:18
 */

import styled from 'styled-components';

import colors from '@components/hibou/colors';


export const Section = styled.section({
  marginBlockStart: '1.6rem',
  marginBlockEnd: '0.6rem',
  marginInline: 0,
  display: 'flex',
  flexDirection: 'column',
});

export const SectionTitle = styled.h2({
  fontSize: '1.2rem',
  lineHeight: '1.6em',
  fontWeight: 600,
  marginBlockEnd: '0.4em',
  paddingBlock: '4px',
  paddingInline: '2px',
  borderStyle: 'solid',
  borderWidth: 0,
  borderBlockWidth: '2px',
  color: colors.primary,
});

export const List = styled.ol({
  listStyleType: 'none',
  marginBlockStart: '0.4em',
  marginBlockEnd: '0.4em',
  paddingInlineStart: 0,
});

export const ListItem = styled.li({
  marginBlockStart: '1.1em',
  marginBlockEnd: '1.8em',
  paddingInlineStart: '0.4em',
  letterSpacing: '0.03em',
  display: 'flex',
  alignItems: 'baseline',
});

export const Article = styled.article({
  marginBlockStart: '0.4em',
  marginBlockEnd: '0.75em',
});

export const ArticleHeader = styled.header({
  marginBlockStart: '0.2em',
  marginBlockEnd: '0.5em',
  fontSize: '1.1rem',
  fontWeight: 550,
  lineHeight: '1.6em',
  color: `${colors.primary}`,
});

export const ArticleContent = styled.div({
  display: 'flex',
  lineHeight: '1.5em',
  marginBlockStart: '0.3em',
  marginBlockEnd: '0.4em',
  counterReset: 'papers',
  opacity: 0.8,

  '::before': {
    counterIncrement: 'papers',
    content: '"[" counter(papers) "]"',
    display: 'block',
    flexGrow: 0,
    flexShrink: 0,
    width: '1.6em',
    textAlign: 'end',
    padding: '0 0.8em',
  },

  '> p': {
    margin: 0,
  },

  '& a': {
    outline: 'none',
    position: 'relative',
    zIndex: 0,
    textDecoration: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    letterSpacing: '0.03em',

    '::before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      top: '78%',
      left: '-0.1em',
      right: '-0.2em',
      bottom: '0.08em',
      backgroundColor: `${colors.primary}80`,
      borderRadius: '0.5em 100% 130% 0.5em',
    },
  },
});

export const RangeBox = styled.div({
  flexGrow: 0,
  flexShrink: 0,
  width: '58px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '0.95rem',
  lineHeight: '1.25em',
  paddingInlineStart: 0,
  paddingInlineEnd: '0.7em',
  opacity: 0.7,
});

export const ItemContent = styled.div({
  flexGrow: 1,
  flexShrink: 1,

  '> *': {
    paddingInlineStart: 'calc(0.4em + 3px)',
  },
});

export const ItemHeader = styled.header({
  marginBlockStart: '0.2em',
  marginBlockEnd: '0.3em',
  paddingInlineStart: '0.4em',
  paddingBlockStart: '0.2em',
  paddingBlockEnd: '0.2em',
  borderInlineStart: `3px solid ${colors.primary}88`,
  fontSize: '1.05rem',
  fontWeight: 600,
  lineHeight: '1.5em',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: `${colors.primary}`,
  opacity: 0.88,
  filter: 'brightness(1.1)',
});

export const ItemHeaderSuffix = styled.span({
  flexGrow: 1,
  color: colors.primary,
  textAlign: 'end',

  '::before': {
    content: '" at "',
    marginInlineStart: '1em',
    marginInlineEnd: '1em',
    fontWeight: 400,
    color: colors.border,
    opacity: 0.6,
    filter: 'brightness(0.8)',
  },
});

export const ItemDesc = styled.p({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: '0.95rem',
  lineHeight: '1.6em',
  margin: 0,
  marginBlockEnd: '0.5em',
  opacity: 0.8,
});

export const ItemBlock = styled.div({
  marginBlockStart: '0.9em',
  marginBlockEnd: '0.6em',
  opacity: 0.9,

  'header + &, p + &': {
    marginBlockStart: '1.9em',
  },

  '> header': {
    marginBlockStart: '0.55em',
    marginBlockEnd: '0.8em',
    fontSize: '1.02rem',
    lineHeight: '1.6em',
    fontWeight: 550,
    opacity: 0.85,
  },

  '> ul': {
    listStyleType: 'none',
    marginBlockStart: '0.5em',
    marginBlockEnd: '0.8em',
    paddingInlineStart: 0,

    '> li': {
      marginBlock: '0.42em',
      paddingInlineStart: 0,
      letterSpacing: '0.03em',
      lineHeight: '1.6em',
      display: 'flex',
      alignItems: 'baseline',
      opacity: 0.75,

      '::before': {
        flexGrow: 0,
        flexShrink: 0,
        content: '"o"',
        display: 'block',
        textAlign: 'center',
        width: '1.82em',
      },
    }
  },
});
