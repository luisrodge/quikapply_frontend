import { Redirect, useParams } from "react-router-dom";
import { Typography } from "antd";

import { useAppSelector } from "../../app/hooks";
import { selectSection, selectSectionRows } from "./applicationsSlice";

import Rows from "./Rows";
import Header from "./Header";
import { Container } from "./style";
import { DRAWER_TYPES } from "../../shared/constants";

const { Title, Text } = Typography;

const SectionDesigner = () => {
  const { sectionId, applicationId } =
    useParams<{ sectionId: string; applicationId: string }>();

  const section = useAppSelector(selectSection(sectionId));
  const sectionRows = useAppSelector(selectSectionRows(sectionId));

  if (!section)
    return (
      <Redirect
        to={{
          pathname: `/applications/${applicationId}`,
        }}
      />
    );

  return (
    <div style={{ background: "#f0f2f5" }}>
      <Header
        drawerType={DRAWER_TYPES.ROW_LAYOUT_PICKER_DRAWER}
        btnTitle="Add row to section"
        applicationId={section.applicationId}
      />
      {sectionRows!.length > 0 && <div style={{ marginTop: 70 }}></div>}
      <Container>
        <Title level={4}>{section.title}</Title>
        <Text>{section.details}</Text>

        <Rows sectionId={sectionId} />
      </Container>
    </div>
  );
};

export default SectionDesigner;