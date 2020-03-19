import * as React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Pagination from 'react-bootstrap/Pagination';
import { ViewWrapper } from "./../../components/View";
import { PlaidConnector } from "./../../components/Plaid";
import { LendingSection } from "./../../components/Lending";

import './index.scss';

enum AppSection {
  Lending,
  Borrowing
}

interface AppPaginationProps {
  current: AppSection;
  select: Function;
}

const AppPagination = ({ current, select } : AppPaginationProps) => {
  return <Pagination className="w-100 mb-5">
    <Pagination.Item className="w-50 text-center" onClick={() => select(AppSection.Lending)} active={current === AppSection.Lending}>
      <div className="px-5">Lending</div>
    </Pagination.Item>
    <Pagination.Item className="w-50 text-center" onClick={() => select(AppSection.Borrowing)} active={current === AppSection.Borrowing}>
      <div className="px-5">Borrowing</div>
    </Pagination.Item>
  </Pagination>;
};

const BorrowingSection = () => <PlaidConnector />;

export const Home = () => {
  const [currentSection, updateSection] = React.useState(AppSection.Lending);
  return (<div className='home-view'>
    <ViewWrapper>
      <div className="callout-main mt-5">
        <Container fluid className="px-5">
          <Row>
            <AppPagination current={currentSection} select={updateSection} />
          </Row>
          <Row>
            {currentSection === AppSection.Borrowing ? <BorrowingSection /> : ''}
            {currentSection === AppSection.Lending ? <LendingSection /> : ''}
          </Row>
        </Container>
        
      </div>
    </ViewWrapper>
  </div>);
}
