/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 14:57:54 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 16:35:23
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

// import getAllPapers from '@api/get-all-papers';
// import getAllProjects from '@api/get-all-projects';
import useTitle from '@hooks/use-title';
import Card from '@components/hibou/card';
import Experience from '@components/section/experience';


const Homepage: React.FC = () => {
  // const papers = getAllPapers();
  // const projects = getAllProjects();

  const { t } = useTranslation();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTitle('Homepage - kyusho');
  }, []);

  return (
    <React.Fragment>
      {/* 引言 */}

      <Card>
        {t('homepage.intro')}
      </Card>

      {/* 工作经历 */}

      <Experience
        title="experience"
        items={[{
          dateBeginRaw: '04/2021',
          dateEndRaw: '09/2021',
          title: 'exp.0.name',
          firm: 'exp.0.com',
          location: 'shanghai,china',
          contents: [{
            title: 'Key Qualifications & Responsibilities',
            items: 'exp.0.kqr',
          }, {
            title: 'Key Achievements',
            items: 'exp.0.ka',
          }],
        }]}
      />

      {/* 学习经历 */}

      <Experience
        title="education"
        items={[{
          dateBeginRaw: '09/2018',
          dateEndRaw: '06/2022',
          title: 'edu.0.name',
          firm: 'edu.0.com',
          contents: [{
            title: 'Key Actions',
            items: 'edu.0.ka',
          }],
        }, {
          title: 'publication',
          items: [(
            <p>
              Z. Zhou (supervisor), X. Zhang, <strong>Z. Yang</strong>, Et al.
              <i>Visual Abstraction of Geographical Point Data with Spatial Autocorrelations</i>.
              IEEE Conference on Visual Analytics Science and Technology, 2020.
              <br />
              <span>
                DOI:&nbsp;
                <a href="https://www.researchgate.net/publication/348226923_Visual_Abstraction_of_Geographical_Point_Data_with_Spatial_Autocorrelations" target="_blank" rel="noreferrer">
                  10.1109/VAST50239.2020.00011
                </a>
              </span>
            </p>
          )]
        }]}
      />
    </React.Fragment>
  );
};


export default Homepage;
