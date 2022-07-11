/*
 * @Author: Kanata You 
 * @Date: 2022-07-11 22:39:57 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 23:34:40
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

import useTitle from '@hooks/use-title';
import Card from '@components/hibou/card';


const Contact: React.FC = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTitle('Contact Me - kyusho');
  }, []);

  return (
    <React.Fragment>
      <Card>
        Email:&nbsp;
        <a
          href={
            'mailto:antoineyang99@gmail.com'
            + '?subject=connect_from_kyusho_homepage'
            + '&body=Connect from Kyusho homepage.'
          }
        >
          antoineyang99[at]gmail.com
        </a>
      </Card>
    </React.Fragment>
  );
};


export default Contact;
