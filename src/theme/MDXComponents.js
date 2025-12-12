// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ColorCode from '../components/ColorCode';
import ColorPalette from '../components/ColorPalette';
import VideoPlayer from '../components/VideoPlayer';
import InfoTooltip from '../components/InfoTooltip';
import PropsTable from '../components/PropsTable';
import ComponentsGrid from '../components/ComponentsGrid';
import { CardSection, Card } from '../components/CardComponents';
import AuthenticationPage from '../components/AuthenticationPage';
import IntroductionPage from '../components/IntroductionPage';
import PartnerIntroductionPage from '../components/PartnerIntroductionPage';
import ErrorsPage from '../components/ErrorsPage';
import CodeSection from '../components/CodeSection';
import Callout from '../components/Callout';
import Badge from '../components/Badge';
import SectionHeader from '../components/SectionHeader';
import FAQAccordion from '../components/FAQAccordion';
import ModernTable from '../components/ModernTable';
import APIEndpoint from '../components/APIEndpoint';
import AttributeList from '../components/AttributeList';
import CodeExample from '../components/CodeExample';
import ApiDocumentation from '../components/ApiDocumentation';
import ApiPage from '../components/ApiPage';
import EventNameCopyButton from '../components/EventNameCopyButton';
import { Row, Col, Properties, Property } from '../components/Layout';
import LeadWidgetDemo from '../components/integration/LeadWidgetDemo';
import AppointmentSchedulerWidget from '../components/integration/AppointmentSchedulerWidget';
import WidgetCodeGenerator from '../components/integration/WidgetCodeGenerator';
import * as icons from '../icons';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  ...icons,

  Tabs,
  TabItem,

  color: ColorCode,
  ColorPalette,
  VideoPlayer,
  InfoTooltip,
  PropsTable,
  ComponentsGrid,
  CardSection,
  Card,
  AuthenticationPage,
  IntroductionPage,
  PartnerIntroductionPage,
  ErrorsPage,
  CodeSection,
  Callout,
  Badge,
  SectionHeader,
  FAQAccordion,
  ModernTable,
  APIEndpoint,
  AttributeList,
  CodeExample,
  ApiDocumentation,
  ApiPage,
  EventNameCopyButton,
  Row,
  Col,
  Properties,
  Property,
  LeadWidgetDemo,
  AppointmentSchedulerWidget,
  WidgetCodeGenerator,
};
