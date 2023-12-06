import React, { useRef, useState } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Input, Flex, Button, message, Table } from 'antd';
import HighLightContent from './components/HighLightContent';
import { queryData } from '../../services/query';
import { columns } from './constants';

const { TextArea } = Input;

const DemoTable = () => {
  const [text, setText] = useState('');
  const caseId = useRef('');
  const [caseText, setCaseText] = useState('');
  const [highLightText, setHighLightText] = useState('');
  const [dataSource, setData] = useState([]);
  const [page, setPage] = useState({
    pageSize: 10,
    total: 0,
    current: 1,
  });

  const onChange = (e) => {
    // console.log(e);
    const value = e.target.value;
    setCaseText(value);
  };

  const queryList = async (params) => {
    const data = {
      caseId: caseId.current,
      ...params,
    };

    const res = await queryData('fieldConfiguration/pageList', {}, data, 'post');

    // console.log(res.data.pageList);
    if (res.succeed) {
      setPage((oldVal) => ({ ...oldVal, total: res.data.totalConut }));
      setData(res.data.pageList);
    } else {
      message.error(res.errorMsg);
    }
  };

  const onSubmit = async () => {
    caseId.current = '';
    const data = {
      caseId: '',
      medicalParagraphs: [{ type: '病例文本', medicalParagraphContent: caseText }],
    };
    const res = await queryData('case/queryNLP', {}, data, 'post');
    // console.log(res);
    if (res.succeed) {
      caseId.current = res.data.caseId;
      // const newData = res.data.medicalParagraphs.map((item) => {
      //   return {
      //     type: item.type, // 从原始对象中提取 type 属性
      //     medicalParagraphContent: item.medicalParagraphContent, // 从原始对象中提取 medicalParagraphContent 属性
      //   };
      // });
      setPage((oldVal) => ({ ...oldVal, current: 1, pageSize: 10 }));
      queryList({ pageNum: 1, pageSize: 10 });
      message.success('提交病例成功');
      setText(caseText);
    } else {
      message.error(res.errorMsg);
    }
  };

  const onPageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    setPage((oldVal) => ({ ...oldVal, current: page, pageSize }));
    queryList({ pageNum: page, pageSize });
  };

  const onRow = (record) => {
    return {
      onMouseEnter: () => {
        // console.log(record);
        setHighLightText(record.field);
      },
    };
  };

  return (
    <div>
      <ProCard title="病例文本" colSpan={24}>
        <TextArea rows={5} placeholder="请输入病例文本内容" onChange={onChange} />
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" style={{ marginRight: 20 }} onClick={onSubmit}>
            提交
          </Button>
          <Button type="default">清空</Button>
        </div>
      </ProCard>
      <ProCard.Group direction="row" gutter={8}>
        <ProCard colSpan={16} bordered>
          <Table
            size="small"
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            pagination={{
              ...page,
              size: 'small',
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: () => `共 ${page.total} 条`,
              onChange: onPageChange,
            }}
            onRow={onRow}
          />
        </ProCard>
        <ProCard colSpan={8} bordered>
          <HighLightContent text={text} highLightText={highLightText} />
        </ProCard>
      </ProCard.Group>
    </div>
  );
};

export default DemoTable;
