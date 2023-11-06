import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { useAssessmentsData } from 'data/services/lms/hooks/selectors';
import InfoPopover from 'components/InfoPopover';
import ReadOnlyAssessment from 'components/Assessment/ReadonlyAssessment';
import messages, { labelMessages } from './messages';

const FinalGrade = () => {
  const { formatMessage } = useIntl();
  const { effectiveAssessmentType, ...assessments } = useAssessmentsData();

  const loadStepData = (step) => ({
    ...assessments[step],
    key: step,
    step,
    stepLabel: formatMessage(labelMessages[step]),
  });

  const effectiveAssessment = loadStepData(effectiveAssessmentType);
  const finalStepScore = effectiveAssessment?.stepScore;

  const extraGrades = Object.keys(assessments)
    .filter(type => type !== effectiveAssessmentType)
    .map(loadStepData);

  const renderAssessment = (stepData, defaultOpen = false) => (
    <ReadOnlyAssessment {...stepData} defaultOpen={defaultOpen} />
  );

  return (
    <div>
      <h3>
        {formatMessage(messages.yourFinalGrade, finalStepScore)}
        <InfoPopover onClick={() => {}}>
          <p>
            {effectiveAssessmentType === 'peer'
              ? formatMessage(messages.peerAsFinalGradeInfo)
              : formatMessage(messages.finalGradeInfo, { step: effectiveAssessmentType })}
          </p>
        </InfoPopover>
      </h3>
      {renderAssessment(effectiveAssessment, true)}
      <div className="my-2" />
      <h3>
        {formatMessage(messages.unweightedGrades)}
        <InfoPopover onClick={() => {}}>
          <p>{formatMessage(messages.unweightedGradesInfo)}</p>
        </InfoPopover>
      </h3>
      {extraGrades.map(assessment => renderAssessment(assessment, false))}
    </div>
  );
};

FinalGrade.defaultProps = {};
FinalGrade.propTypes = {};

export default FinalGrade;