/*
 * @Author: Kanata You 
 * @Date: 2022-03-25 17:02:49 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 17:05:46
 */

import { PaperInfoProps } from '@components/paper-info';


const getAllPapers = (): PaperInfoProps[] => [{
  authors: [
    'Zhiguang Zhou',
    'Xinlong Zhang',
    {
      name: 'Zhendong Yang',
      strong: true
    },
    1
  ],
  title: 'Visual Abstraction of Geographical Point Data with Spatial Autocorrelations',
  press: 'IEEE Conference on Visual Analytics Science and Technology, 2020',
  doi: '10.1109/VAST50239.2020.00011',
  researchGate: 'https://www.researchgate.net/publication/348226923_Visual_Abstraction_of_Geographical_Point_Data_with_Spatial_Autocorrelations'
}];


export default getAllPapers;
