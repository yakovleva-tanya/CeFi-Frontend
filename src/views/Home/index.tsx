import * as React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ViewWrapper, AppSection } from "./../../components/View";
import { LendingSection } from "./../../components/LendingSection";
import { BorrowingSection } from "./../../components/BorrowingSection";

import './index.scss';

export const Home = () => {
  const [currentSection, updateSection] = React.useState(AppSection.Lending);
  return (<div className='home-view'>
    <ViewWrapper updateSection={updateSection} currentSection={currentSection}>
      <div className="callout-main mt-5">
        <Container fluid className="px-5">
          <Col xs={{ span: 8, offset: 2 }}>
            <Row>
              {currentSection === AppSection.Borrowing ? <BorrowingSection /> : ''}
              {/* {currentSection === AppSection.Lending ? <LendingSection /> : ''} */}
            </Row>
          </Col>
        </Container>

      </div>
    </ViewWrapper>
  </div>);
}
