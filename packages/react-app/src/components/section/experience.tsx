/*
 * @Author: Kanata You 
 * @Date: 2022-07-11 13:03:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 14:37:11
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Section,
  SectionTitle,
  List,
  ListItem,
  RangeBox,
  ItemContent,
  ItemHeader,
  ItemHeaderSuffix,
  ItemDesc,
  ItemBlock,
  Article,
  ArticleContent,
  ArticleHeader
} from '.';


export interface ExperienceListContent {
  title: string;
  items: string;
}

export interface ExperienceArticles {
  title: string;
  items: JSX.Element[];
}

export interface ExperienceItem {
  dateBeginRaw: string;
  dateEndRaw: string;
  title: string;
  firm: string;
  location?: string;
  contents: ExperienceListContent[];
}

export interface ExperienceProps {
  title: string;
  items: (ExperienceItem | ExperienceArticles)[];
}

const Experience: React.FC<ExperienceProps> = React.memo(function Experience ({
  title,
  items,
}) {
  const { t } = useTranslation();

  return (
    <Section>
      <SectionTitle>
        {t(title)}
      </SectionTitle>
      <List>
        {
          (items as ExperienceItem[]).map((d, i) => (d as ExperienceItem).dateBeginRaw && (
            <ListItem key={i} >
              <RangeBox>
                <span>{d.dateBeginRaw}</span>
                <span>-</span>
                <span>{d.dateEndRaw}</span>
              </RangeBox>
              <ItemContent>
                <ItemHeader>
                  {t(d.title)}
                  <ItemHeaderSuffix>
                    {t(d.firm)}
                  </ItemHeaderSuffix>
                </ItemHeader>
                {
                  d.location && (
                    <ItemDesc>
                      {t(d.location)}
                    </ItemDesc>
                  )
                }
                {
                  d.contents.map((c, j) => (
                    typeof c.items === 'string' && (
                      <ItemBlock key={j}>
                        <header>{t(c.title)}</header>
                        <ul>
                          {
                            typeof c.items === 'string' && t(c.items).split('\n').map((d, k) => (
                              <li key={k}>
                                {d}
                              </li>
                            ))
                          }
                        </ul>
                      </ItemBlock>
                    )
                  ))
                }
              </ItemContent>
            </ListItem>
          ))
        }
      </List>
      {
        (items as ExperienceArticles[]).map((d, i) => Array.isArray((d as ExperienceArticles).items) && (
          <Article key={i}>
            <ArticleHeader>
              {t(d.title)}
            </ArticleHeader>
            {
              d.items.map((e, j) => (
                <ArticleContent key={j}>
                  {e}
                </ArticleContent>
              ))
            }
          </Article>
        ))
      }
    </Section>
  );
});


export default Experience;
