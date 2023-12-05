import {
  ACTIVE_CHALLENGE_ROUTE,
  ACTIVITY_ROUTE,
  BASKET_ROUTE,
  CHALLENGE_ROUTE,
  CREATING_CHALLENGE_ROUTE,
  DYNAMICS_ROUTE,
  EDITING_ROUTE,
  EXCHANGE_HISTORY_ROUTE,
  HEALTH_INDEX_RESULTS_ROUTE,
  HEALTH_INDEX_ROUTE,
  INDIVIDUAL_REPORT_ROUTE,
  INTERESTING_ROUTE,
  LECTURE_ROUTE,
  LECTURES_ROUTE,
  LOGIN_ROUTE,
  MAKING_ORDER_ROUTE,
  POST_INTERESTING_ROUTE,
  ACCESS_RECOVERY__ROUTE,
  PROFILE_ROUTE,
  QUESTIONNAIRE_ROUTE,
  REGISTRATION_ROUTE,
  REPORT_ROUTE,
  SHOP_ROUTE,
  SETTINGS_ROUTE,
  START_ROUTE,
  TEAM_SELECTION_ROUTE,
  TRACKER_HABITS_ROUTE,
  TRACKER_ROUTE,
  GOAL_SLEEP__ROUTE,
  GOAL_FRUITS__ROUTE,
  GOAL_WATER__ROUTE,
  STATISTICS_TRACKER__ROUTE,
  CHAT__ROUTE,
  NEW_CHALLENGE_INFO_ROUTE,
  CREATING_INTERESTING_ROUTE,
  SYNCING_ROUTE,
  PRODUCT_SCREEN_ROUTE,
  TEAM_MEMBER_ROUTE,
  PROFILE_MEMBER_ROUTE,
  RUBRIC_ROUTE,
  DIALOG__ROUTE,
  INTERVIEW_PAGE,
  CREATING_LECTURE_ROUTE,
  CONSULTATION_ROUTE,
  AUTH_GOOFLE_ROUTE
} from './constants-route'
import { AuthPage } from '../pages/Authorization/Auth-page'
import { StartPage } from '../pages/Start-pages/StartPage'
import { ActivityPage } from '../pages/Activity-page/Activity-page'
import { TrackerPage } from '../pages/Tracker/Tracker-page'
import { HealthIndexPage } from '../pages/Health-index/Health-index-page'
import ChallengePage from '../pages/Challenge/Challenge-page'
import { InterestingPage } from '../pages/Interesting-page/Interesting-page'
import { RegistrationPage } from '../pages/Registration/Registration'
import { Settings } from '../pages/Settings/Settings'
import { Profile } from '../pages/Profile/Profile'
import { Editing } from '../pages/Editing/Editing'
import { CreatingChallengePage } from '../pages/Create-challenge/Creating-challenge'
import { Questionnaire } from '../pages/Questionnaire/Questionnaire'
import { ShopPage } from '../pages/Shop-page/Shop-page'
import { BasketPage } from '../pages/Basket-page/Basket-page'
import { MakingOrder } from '../pages/Making-order/Making-order'
import { ActiveChallengePage } from '../pages/Active-challenge-page/Active-challenge-page'
import { LecturesPages } from '../pages/Lectures-pages/Lectures-pages'
import { LecturePage } from '../pages/Lecture-page/Lecture-page'
import { TeamSelectionPage } from '../pages/Team-selection-page/Team-selection-page'
import { TrackerHabitsPage } from '../pages/Tracker-habits/Tracker-habits-page'
import { ExchangeHistory } from '../pages/Exchange-history/Exchange-history'
import { HealthIndexResults } from '../pages/Health-index-results/Health-index-results'
import { DynamicsPage } from '../pages/Dynamics-page/Dynamics-page'
import { IndividualReportPage } from '../pages/Individual-report-page/Individual-report-page'
import { ReportPage } from '../pages/Report-page/Report-page'
import { MotivationPage } from '../pages/Motivation-page/Motivation-page'
import { AccessRecoveryPage } from '../pages/Access-recovery-page/Access-recovery-page'
import { GoalWater } from '../pages/Goal-water/Goal-water'
import { GoalFruits } from '../pages/Goal-fruits/Goal-fruits'
import { StatisticTracker } from '../pages/Statistic-tracker/Statistic-tracker'
import { GoalSleep } from '../pages/Goal-sleep/Goal-sleep'
import { ChatPage } from '../pages/Chat-page/Chat-page'
import { NewChallengeInfo } from '../pages/New-challenge-info/New-Challenge-Info'
import { CreatingInteresting } from '../pages/Creating-interesting/Creating-interesting'
import { SyncingPage } from '../pages/Syncing-page/Syncing-page'
import { ProductScreen } from '../pages/Product-screen/Product-screen'
import { TeamMembersPage } from '../pages/Team-members-page/Team-members-page'
import { ProfileMemberPage } from '../pages/Profile-member-page/Profile-member-page'
import { RubricPage } from '../pages/Rubric-page/Rubric-page'
import { PersonalChat } from '../pages/Chat-page/Personal-chat'
import { InterviewPage } from '../pages/Interview-page/Interview-page'
import { CreatingLecture } from '../Components/Lecture/Creating-lecture'
import { ConsultationPage } from '../pages/Consultation/Consultation-page'
import { AuthorizationGoogle } from '../Components/AuthorizationGoogle/AuthorizationGoogle'

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegistrationPage
  },
  {
    path: ACCESS_RECOVERY__ROUTE,
    Component: AccessRecoveryPage
  },
  {
    path: AUTH_GOOFLE_ROUTE,
    Component: AuthorizationGoogle
  }
]

export const privateRoutes = [
  {
    path: START_ROUTE,
    Component: StartPage
  },
  {
    path: ACTIVITY_ROUTE,
    Component: ActivityPage
  },
  {
    path: TRACKER_ROUTE,
    Component: TrackerPage
  },
  {
    path: HEALTH_INDEX_ROUTE,
    Component: HealthIndexPage
  },
  {
    path: CHALLENGE_ROUTE,
    Component: ChallengePage
  },
  {
    path: INTERESTING_ROUTE,
    Component: InterestingPage
  },
  {
    path: SETTINGS_ROUTE,
    Component: Settings
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile
  },
  {
    path: EDITING_ROUTE,
    Component: Editing
  },
  {
    path: CREATING_CHALLENGE_ROUTE,
    Component: CreatingChallengePage
  },
  {
    path: QUESTIONNAIRE_ROUTE,
    Component: Questionnaire
  },
  {
    path: SHOP_ROUTE,
    Component: ShopPage
  },
  {
    path: BASKET_ROUTE,
    Component: BasketPage
  },
  {
    path: MAKING_ORDER_ROUTE,
    Component: MakingOrder
  },
  {
    path: ACTIVE_CHALLENGE_ROUTE + '/:id',
    Component: ActiveChallengePage
  },
  {
    path: LECTURES_ROUTE + '/:id',
    Component: LecturesPages
  },
  {
    path: LECTURE_ROUTE + '/:id',
    Component: LecturePage
  },
  {
    path: CREATING_LECTURE_ROUTE + '/:id',
    Component: CreatingLecture
  },
  {
    path: TEAM_SELECTION_ROUTE+'/:id',
    Component: TeamSelectionPage
  },
  {
    path: TRACKER_HABITS_ROUTE,
    Component: TrackerHabitsPage
  },
  {
    path: EXCHANGE_HISTORY_ROUTE,
    Component: ExchangeHistory
  },
  {
    path: HEALTH_INDEX_RESULTS_ROUTE,
    Component: HealthIndexResults
  },
  {
    path: DYNAMICS_ROUTE,
    Component: DynamicsPage
  },
  {
    path: INDIVIDUAL_REPORT_ROUTE,
    Component: IndividualReportPage
  },
  {
    path: REPORT_ROUTE+'/:id',
    Component: ReportPage
  },
  {
    path: POST_INTERESTING_ROUTE + '/:id',
    Component: MotivationPage
  },
  {
    path: GOAL_SLEEP__ROUTE,
    Component: GoalSleep
  },
  {
    path: GOAL_FRUITS__ROUTE,
    Component: GoalFruits
  },
  {
    path: GOAL_WATER__ROUTE,
    Component: GoalWater
  },
  {
    path: STATISTICS_TRACKER__ROUTE,
    Component: StatisticTracker
  },
  {
    path: CHAT__ROUTE,
    Component: ChatPage
  },
  {
    path: DIALOG__ROUTE + '/:id',
    Component: PersonalChat
  },
  {
    path: NEW_CHALLENGE_INFO_ROUTE + '/:id',
    Component: NewChallengeInfo
  },
  {
    path: CREATING_INTERESTING_ROUTE,
    Component: CreatingInteresting
  },
  {
    path: SYNCING_ROUTE,
    Component: SyncingPage
  },
  {
    path: PRODUCT_SCREEN_ROUTE + '/:id',
    Component: ProductScreen
  }, 
  {
    path: TEAM_MEMBER_ROUTE+'/:id',
    Component: TeamMembersPage
  },
  {
    path: PROFILE_MEMBER_ROUTE + '/:id',
    Component: ProfileMemberPage
  },
  {
    path: RUBRIC_ROUTE,
    Component: RubricPage
  },
  {
    path: INTERVIEW_PAGE,
    Component: InterviewPage
  },
  {
    path: CONSULTATION_ROUTE,
    Component: ConsultationPage
  }
]
