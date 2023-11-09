import { StrictDict } from '@edx/react-unit-test-utils';

import { routeSteps } from 'constants';
import {
  progressKeys,
  stepConfigs,
  teamStates,
  viewKeys,
  stateStepConfigs,
} from 'constants/mockData';

import pageData from './pageData';

export const defaultViewProgressKeys = StrictDict({
  [viewKeys.xblock]: progressKeys.submissionUnsaved,
  [viewKeys.submission]: progressKeys.submissionSaved,
  [viewKeys.studentTraining]: progressKeys.studentTraining,
  [viewKeys.self]: progressKeys.selfAssessment,
  [viewKeys.peer]: progressKeys.peerAssessment,
  [viewKeys.done]: progressKeys.graded,
});

export const loadState = (opts) => {
  const {
    view,
  } = opts;
  const viewStep = routeSteps[view];
  const progressKey = opts.progressKey || defaultViewProgressKeys[view];
  const isTeam = teamStates.includes(progressKey) || (opts.isTeam === true);
  const stepConfig = stateStepConfigs[progressKey] || stepConfigs.all;

  const state = {
    progress: pageData.getProgressState({ progressKey, stepConfig, viewStep }),
    response: pageData.getResponseState({ progressKey, isTeam }),
    assessment: pageData.getAssessmentState({ progressKey, stepConfig }),
  };
  console.log({
    opts, progressKey, progressData: state, isTeam,
  });
  return state;
};
