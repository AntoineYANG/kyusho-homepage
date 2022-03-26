/*
 * @Author: Kanata You 
 * @Date: 2022-03-25 14:42:04 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 00:41:24
 */

import React from 'react';
import styled from 'styled-components';

import { Strong, Anchor } from '@components/common';


export interface ProjectInfoProps {
  title: string;
  links?: {
    text: string;
    href: string;
  }[];
  info?: string;
  desc?: string;
  keywords?: string[];
}

const ProjectView = styled.div({
  padding: '0 0 0.9em'
});

const ProjectHeader = styled.h1({
  margin: '0 0 0.8em',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  fontSize: '1.1rem',
  lineHeight: '1.6em',
  fontWeight: 550
});

const ProjectTitle = styled.span({
  flexGrow: 0,
  flexShrink: 0,
  marginRight: '1em',
  fontWeight: 600
});

const ProjectInfoView = styled.small({
  flexGrow: 1,
  flexShrink: 0,
  fontSize: '0.7em',
  opacity: 0.7,
  lineHeight: '1.6em',
  textAlign: 'end',
  textShadow: 'none',
  fontWeight: 550
});

const ProjectInfoDesc = styled.div({
  margin: '0.8em 0'
});

const ProjectKeywords = styled.div({
  margin: '0.8em 0'
});

const ProjectPartHeader = styled.h2`
  position: relative;
  margin: 0.95em 0 0.75em;
  font-size: 0.9rem;
  font-weight: 550;
  color: rgb(89,36,126);

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 100%;
    left: -0.1em;
    right: -0.2em;
    bottom: -8%;
    background-image: linear-gradient(5deg, rgb(192,222,120) 6%, transparent 120%);
    box-shadow: 1px 1px 1px rgba(89,36,126,0.5);
    border-radius: 0.5em 100% 130% 0.5em;
    pointer-events: none;
  }
`;

const ProjectPartContent = styled.p({
  margin: '0.9em -2px 0.8em 0',
  padding: '0.6em 1em 1.15em',
  backgroundColor: '#EDF7E5A0',
  backgroundImage: `linear-gradient(#fff 2px, transparent 0),
                    linear-gradient(90deg, #fff 2px, transparent 0),
                    linear-gradient(#fff9 1px, transparent 0),
                    linear-gradient(90deg, #fff9 1px, transparent 0),
                    linear-gradient(96.02deg, #EDF7E5C0 19.79%, #F4F7F1C0 95.18%)`,
  backgroundSize: `30px 30px, 30px 30px,
                  6px 6px, 6px 6px,
                  cover`,
  boxShadow: 'inset -2px -6px 14.5px #0002',
  fontSize: '0.9rem',
  fontWeight: 500
});

const ProjectPartText = styled.span({
  textShadow: '0 0 2px #0004'
});

const ProjectInfo: React.FC<ProjectInfoProps> = ({
  title, links, info, desc, keywords
}) => {
  return (
    <ProjectView>
      <ProjectHeader>
        <ProjectTitle>
          <Strong>
            {title}
          </Strong>
        </ProjectTitle>
        {
          links?.map((link, i) => (
            <Anchor
              key={i}
              href={link.href}
              style={{
                fontSize: '0.9rem',
                lineHeight: '1.6em',
                fontWeight: 500
              }}
            >
              {`[${link.text}]`}
            </Anchor>
          ))
        }
        {
          info && (
            <ProjectInfoView>
              {info}
            </ProjectInfoView>
          )
        }
      </ProjectHeader>
      {
        desc && (
          <ProjectInfoDesc>
            <ProjectPartHeader>
              项目描述
            </ProjectPartHeader>
            <ProjectPartContent>
              <ProjectPartText>
                {desc}
              </ProjectPartText>
            </ProjectPartContent>
          </ProjectInfoDesc>
        )
      }
      {
        keywords && (
          <ProjectKeywords>
            <ProjectPartHeader>
              关键词
            </ProjectPartHeader>
            <ProjectPartContent>
              {keywords.join(', ') + '. '}
            </ProjectPartContent>
          </ProjectKeywords>
        )
      }
    </ProjectView>
  );
};


export default ProjectInfo;
