/*
 * @Author: Kanata You 
 * @Date: 2022-03-25 14:42:04 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 20:45:58
 */

import React from 'react';
import styled from 'styled-components';

import { Strong, Anchor } from '@components/common';


export enum PaperAuthorFlag {
  AT_AL = 1
}

export interface PaperInfoProps {
  authors: (string | {
    name: string;
    strong: boolean;
  } | PaperAuthorFlag)[];
  title: string;
  press: string;
  doi?: string;
  researchGate?: string;
}

const Paper = styled.p({
  margin: 0,
  textShadow: 'none'
});

const Authors = styled.span({});

const Title = styled.span({});

const Press = styled.i({});

const PaperInfo: React.FC<PaperInfoProps> = ({
  authors, title, press, doi, researchGate
}) => {
  return (
    <Paper>
      <Authors>
        {
          authors.map(
            (aut, i, { length }) => [
              aut === PaperAuthorFlag.AT_AL ? (
                  <React.Fragment key={i * 2}>
                    {'at al'}
                  </React.Fragment>
                ) : (
                typeof aut === 'string' || !aut.strong ? (
                  <React.Fragment key={i * 2}>
                    {(aut as { name?: string }).name ?? aut as string}
                  </React.Fragment>
                ) : (
                  <Strong key={i * 2}>
                    {aut.name}
                  </Strong>
                )
              ),
              (
                <React.Fragment key={i * 2 + 1}>
                  {i === length - 1 ? '. ' : ', '}
                </React.Fragment>
              )
            ]
          ).flat(Infinity)
        }
      </Authors>
      <wbr />
      <Title>
        {`"${title}." `}
      </Title>
      <wbr />
      <Press>
        {`${press}. `}
      </Press>
      {
        doi && (
          <>
            <br />
            DOI:
            <Anchor
              href={`http://dx.doi.org/${doi}`}
            >
              {doi}
            </Anchor>
            {' '}
          </>
        )
      }
      {
        researchGate && (
          <>
            <wbr />
            <Anchor
              href={researchGate}
            >
              {' [ResearchGate] '}
            </Anchor>
          </>
        )
      }
    </Paper>
  );
};


export default PaperInfo;
