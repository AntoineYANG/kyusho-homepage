/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 14:57:54 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 16:19:08
 */

import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from '@views';
import ParticleLayer from '@components/particle-layer';
import PageHeader from '@components/page-header';
import MarkdownViewer from '@components/markdown-viewer';
import getArticle from '@api/get-article';
import useTitle from '@hooks/use-title';
import { Layout } from '@components/hibou/layout';


const ArticlePage: React.FC = () => {
  const { aid } = useParams<{ aid: string }>();
  // const { t } = useTranslation();
  const [articleData, setArticleData] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState('Article - kyusho');

  React.useEffect(() => {
    if (aid) {
      getArticle(aid).then(data => {
        setArticleData(data);
      });
    }
  }, [aid, setArticleData]);

  React.useEffect(() => {
    useTitle(title);
  }, [title]);

  React.useEffect(() => {
    const _title = /^# (?<name>.*)/.exec(articleData ?? '')?.groups?.['name'];

    if (_title && _title !== title) {
      setTitle(`${_title} - kyusho`);
    }
  }, [articleData, title, setTitle]);

  return (
    <Page>
      <ParticleLayer />
      <PageHeader />
      <Layout.Main>
        {
          articleData && (
            <MarkdownViewer>
              {articleData}
            </MarkdownViewer>
          )
        }
      </Layout.Main>
    </Page>
  );
};


export default ArticlePage;
