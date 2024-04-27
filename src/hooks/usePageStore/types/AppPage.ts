import { type AuthenticationPage } from './AuthenticationPage';
import { type BoardPage } from './BoardPage';
import { type CommonPage } from './CommonPage';

export type AppPage = CommonPage | BoardPage | AuthenticationPage;
