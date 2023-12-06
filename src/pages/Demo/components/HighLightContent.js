import React from 'react';
import { Text } from 'antd';

const HighLightContent = ({ text, highLightText }) => {
  if (highLightText && text?.includes(highLightText)) {
    const content = text.replaceAll(
      highLightText,
      `<span style="background-color: gold;">${highLightText}</span>`,
    );
    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  } else {
    return <p>{text}</p>;
  }
};

export default HighLightContent;
