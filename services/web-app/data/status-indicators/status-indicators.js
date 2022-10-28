/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const StatusIndicators = {
  high: [
    {
      name: 'Failure',
      token: '$support-01',
      description: 'Indicates a process failure that needs immediate attention',
      usage: 'failed processes, emergencies, urgent alerts',
      fileNames: ['critical-filled', 'critical-outline']
    },
    {
      name: 'Warning',
      token: '$support-01',
      description: 'Indicates an error (often inline) that needs immediate attention',
      usage: 'warnings, errors, alerts, failure',
      fileNames: ['warning-filled', 'warning-outline']
    },
    {
      name: 'Warning alt',
      token: '$support-01',
      description: 'Carries the same meaning as ‘Warning’',
      fileNames: ['warning-hex-filled', ' warning-hex-outline']
    },
    {
      name: 'Misuse',
      token: '$support-01',
      description:
        'Indicates unavailability, an incorrect use case (especially in usage guidance), or a run that has been cancelled',
      usage: 'incorrect usage, unavailability, cancellation',
      fileNames: ['misuse-filled', 'misuse-outline']
    },
    {
      name: 'Caution major',
      token: 'Orange 40/Orange 60 outline, Orange 40',
      description:
        'Indicates a threshold has been breached; alerts a user before a critical ' +
        'event is triggered (only used in conjunction with ‘Caution’)',
      usage: 'major caution, serious situations, critical instability',
      fileNames: ['caution-major-filled', 'caution-major-outline']
    },
    {
      name: 'Caution minor',
      token: '$support-03/Yellow 60 outline, $support-03',
      description:
        'Indicates the existence of a non-service affecting fault condition requiring corrective action to prevent a more serious fault',
      usage: 'minor caution, prevention, instability',
      fileNames: ['caution-filled', 'caution-outline']
    }
  ],
  medium: [
    {
      name: 'Undefined',
      token: 'Purple 60, Purple 50',
      description:
        'Indicates a value that is outside of an acceptable range or formatted incorrectly',
      usage: 'experimental work, outliers',
      fileNames: ['undefined-filled', 'undefined-outline']
    },
    {
      name: 'Normal',
      token: '$support-02',
      description:
        'Indicates stability or the clearing of one or more reported alarms; implies no issues are present',
      usage: 'success, completion, stability, active states',
      fileNames: ['checkmark-circle-green-filled', 'checkmark-circle-green-outline']
    },
    {
      name: 'Normal alt',
      token: '$support-02',
      description:
        'Carries the same meaning as ‘Normal’ but is more often used in data tables and confined spaces',
      fileNames: ['checkmark']
    },
    {
      name: 'Success',
      token: '$support-04',
      description:
        'Indicates success at the end of a process (usually used as an interactive state within Carbon components,' +
        ' hence the color change)',
      usage: 'success, completion',
      fileNames: ['checkmark-circle-blue-filled', 'checkmark-circle-blue-outline']
    },
    {
      name: 'In progress',
      token: '$support-04',
      description:
        'Indicates a process has started but has not finished running (icon will be replaced by ‘checkmark’' +
        ' or ‘warning’ icon when the status of the job changes)',
      usage: 'unfinished, running processes',
      fileNames: ['inprogress']
    },
    {
      name: 'Incomplete',
      token: '$support-04',
      description:
        'Indicates a stepped process has begun but is not yet finished (icon appears in Carbon’s Progress Indicator component)',
      usage: 'incomplete tasks',
      fileNames: ['incomplete']
    },
    {
      name: 'Not started',
      token: '$support-04',
      description:
        'Indicates that a job or step (in Carbon’s Progress Indicator) has not yet been started',
      usage: 'upstarted tasks or disabled processes',
      fileNames: ['circle-dash']
    },
    {
      name: 'Pending',
      token: 'Gray 60, Gray 50',
      description:
        'Indicates a job has started but can not be scheduled due to insufficient resources',
      usage: 'indefinite holds',
      fileNames: ['pending-filled', 'pending-outline']
    }
  ],
  low: [
    {
      name: 'Unknown',
      token: 'Gray 60, Gray 50',
      description: 'Indicates that the status of an object is unknown',
      usage: 'unknown, undefined status',
      fileNames: ['unknown-filled', 'unknown-outline']
    },
    {
      name: 'Unknown',
      token: 'Gray 60, Gray 50',
      description: 'Indicates that the status of an object is unknown',
      usage: 'unknown, undefined status',
      fileNames: ['unknown-filled', 'unknown-outline']
    },
    {
      name: 'Help',
      token: 'Gray 60, Gray 50',
      description: 'Indicates additional support or FAQ content is available',
      usage: 'help, guidance, exceptions',
      fileNames: ['help-filled', 'help-outline']
    },
    {
      name: 'Information',
      token: '$support-04',
      description: 'Indicates additional (non-essential) information is available',
      usage: 'additional information, exceptions',
      fileNames: ['information-circle-filled', 'information-circle-outline']
    },
    {
      name: 'Information alt',
      token: '$support-04',
      description: 'Carries the same meaning as ‘Information’',
      usage: 'additional information, exceptions',
      fileNames: ['information-square-filled', 'information-square-outline']
    }
  ],
  glyph: [
    {
      name: 'Failure',
      token: '$support-01',
      description: 'Indicates a severe process failure or error that needs immediate attention',
      usage: 'critical failures, emergencies urgent alerts, deprecation and cancellation',
      fileNames: ['failure']
    },
    {
      name: 'Critical severity',
      token: '$support-01',
      description:
        'Indicates critical severity threat, critical severity object (like an IP), or critical ' +
        'risk of a data breach; based on a 1–10 scale',
      usage: 'critical (10) threat, critical risk, critical severity warnings',
      fileNames: ['critical-severity']
    },
    {
      name: 'High severity',
      token: '$support-01',
      description:
        'Indicates high severity threat, high severity object (like an IP), or high risk of a data breach; based on a 1–10 scale',
      usage: 'critical (10) threat, critical risk, critical severity warnings',
      fileNames: ['high-severity']
    },
    {
      name: 'Medium severity',
      token: 'Orange 40/Orange 60 stroke, Orange 40',
      description:
        'Indicates medium severity threat, medium severity object (like an IP), or medium risk of a data breach; based on a 1–10 scale',
      usage: 'medium threat (4–6), medium risk, medium severity warnings',
      fileNames: ['medium-severity']
    },
    {
      name: 'Low severity',
      token: '$support-03/Yellow 60 stroke, $support-03',
      description:
        'Indicates low severity threat, low severity object (like an IP), or low risk of a data breach; based on a 1–10 scale',
      usage: 'low threat (0–3), low risk, low severity warnings',
      fileNames: ['low-severity']
    },
    {
      name: 'Caution',
      token: '$support-03/Yellow 60 stroke, $support-03',
      description:
        'When not using the Security risk/severity scale,' +
        ' this can be used to indicate the existence of a non-service affecting fault condition',
      usage: 'minor caution, prevention, instability',
      fileNames: ['caution']
    },
    {
      name: 'Undefined',
      token: 'Purple 60, Purple 50',
      description:
        'Indicates a value that is outside of an acceptable range or formatted incorrectly',
      usage: 'experimental work, outliers',
      fileNames: ['undefined']
    },
    {
      name: 'Stable',
      token: '$support-02',
      description:
        'Indicates stability or the clearing of one or more reported alarms; implies no issues are present',
      usage: 'success, completion, stability, active states',
      fileNames: ['circle-fill']
    },
    {
      name: 'New',
      token: '$support-04',
      description: 'Indicates a new components, features or pieces of content',
      usage: 'new items, additional information',
      fileNames: ['new']
    },
    {
      name: 'Information',
      token: '$support-04',
      description:
        'Indicates additional information is available (can be used adaptively for statuses not taken into account by this table)',
      usage: 'additional information, wild card',
      fileNames: ['square-fill']
    },
    {
      name: 'Incomplete',
      token: '$support-04',
      description:
        'Indicates a process has started but not finished running or a user task is unfinished',
      usage: 'unfinished, running processes',
      fileNames: ['incomplete']
    },
    {
      name: 'Draft',
      token: 'Gray 60, Gray 50',
      description:
        ' Indicates that a job has not been started, draft status of a job or a disabled process',
      usage: 'unstarted tasks, drafts, disabled processes',
      fileNames: ['circle-stroke']
    }
  ]
}

export default StatusIndicators
