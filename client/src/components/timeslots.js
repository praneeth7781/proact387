// import { FaMarsDouble } from "react-icons/fa";
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'

export const A = {
    id: 'A',
    startTimes: {
      'monday': [
        new Date('2023-05-01T08:30:00'),
        
      ],
      'tuesday': [
        new Date('2023-05-03T09:35:00')
      ],
      'thursday': [
        new Date('2023-05-05T10:35:00'),
       
      ]
    },
    endTimes: {
      'monday': [
        new Date('2023-05-01T09:25:00'),
      
      ],
      'tuesday': [
        new Date('2023-05-03T10:25:00')
      ],
      'thursday': [
        new Date('2023-05-05T11:30:00'),
       
      ]
    }
  };
 export const B = {
    id: 'B',
    startTimes: {
      
      'wednesday': [
        new Date('2023-05-03T11:00:00')
      ],
      'friday': [
        new Date('2023-05-05T11:00:00'),
        
      ]
    },
    endTimes: {
      
      'wednesday': [
        new Date('2023-05-03T12:30:00')
      ],
      'friday': [
        new Date('2023-05-05T12:30:00'),
      
      ]
    }
  };
 export const C = {
    id: 'C',
    startTimes: {
      'monday': [
        new Date('2023-05-01T17:30:00'),
        
      ],
      
      'thursday': [
        new Date('2023-05-05T17:30:00'),
       
      ]
    },
    endTimes: {
      'monday': [
        new Date('2023-05-01T19:00:00'),
      
      ],
      
      'thursday': [
        new Date('2023-05-05T19:00:00'),
       
      ]
    }
  };
  export const D = {
    id: 'D',
    startTimes: {
      
      'friday': [
        new Date('2023-05-05T14:00:00'),
       
      ]
    },
    endTimes: {
      
      'friday': [
        new Date('2023-05-05T17:00:00'),
       
      ]
    }
  };
  export const E = {
    id: 'E',
    startTimes: {
      
      'tuesday': [
        new Date('2023-05-05T14:00:00'),
       
      ]
    },
    endTimes: {
      
      'tuesday': [
        new Date('2023-05-05T17:00:00'),
       
      ]
    }
  };
  export const F = {
    id: 'F',
    startTimes: {
      'monday': [
        new Date('2023-05-01T09:30:00'),
        
      ],
      'tuesday': [
        new Date('2023-05-03T10:35:00')
      ],
      'thursday': [
        new Date('2023-05-05T11:35:00'),
       
      ]
    },
    endTimes: {
      'monday': [
        new Date('2023-05-01T10:25:00'),
      
      ],
      'tuesday': [
        new Date('2023-05-03T11:25:00')
      ],
      'thursday': [
        new Date('2023-05-05T12:30:00'),
       
      ]
    }
  };
  export const G = {
    id: 'G',
    startTimes: {
      'monday': [
        new Date('2023-05-01T15:30:00'),
        
      ],
      'thursday': [
        new Date('2023-05-05T15:30:00'),
       
      ]
    },
    endTimes: {
      'monday': [
        new Date('2023-05-01T17:00:00'),
      
      ],
      'thursday': [
        new Date('2023-05-05T17:00:00'),
       
      ]
    }
  };
  export const H = {
    id: 'H',
    startTimes: {
      'wednesday': [
        new Date('2023-05-01T09:30:00'),
        
      ],
      'friday': [
        new Date('2023-05-03T09:30:00')
      ],
    },
    endTimes: {
      'wednesday': [
        new Date('2023-05-01T11:00:00'),
      
      ],
      'friday': [
        new Date('2023-05-03T11:00:00')
      ],
    }
  };
  export const I = {
    id: 'I',
    startTimes: {
      'monday': [
        new Date('2023-05-01T11:30:00'),
        
      ],
      'tuesday': [
        new Date('2023-05-03T08:35:00')
      ],
      'thursday': [
        new Date('2023-05-05T09:35:00'),
       
      ]
    },
    endTimes: {
      'monday': [
        new Date('2023-05-01T12:25:00'),
      
      ],
      'tuesday': [
        new Date('2023-05-03T09:30:00')
      ],
      'thursday': [
        new Date('2023-05-05T10:30:00'),
       
      ]
    }
  };
  export const J = {
    id: 'J',
    startTimes: {
      'monday': [
        new Date('2023-05-05T10:35:00'),
      
        
      ],
      'tuesday': [
        new Date('2023-05-03T11:35:00')
      ],
      'thursday': [
        new Date('2023-05-01T08:30:00'),
       
      ]
    },
    endTimes: {
      'monday': [
        new Date('2023-05-05T11:30:00'),
      
      ],
      'tuesday': [
        new Date('2023-05-03T12:30:00')
      ],
      'thursday': [
       
        new Date('2023-05-01T09:25:00'),
       
      ]
    }
  };
  export const K = {
    id: 'K',
    startTimes: {
      'monday': [
        new Date('2023-05-01T19:00:00'),
        
      ],
      
      'thursday': [
        new Date('2023-05-05T19:00:00'),
       
      ]
    },
    endTimes: {
      'monday': [
        new Date('2023-05-01T20:30:00'),
      
      ],
      
      'thursday': [
        new Date('2023-05-05T20:30:00'),
       
      ]
    }
  };
  export const L = {
    id: 'L',
    startTimes: {
      'monday': [
        new Date('2023-05-01T14:00:00'),
        
      ],
      
      'thursday': [
        new Date('2023-05-05T14:00:00'),
       
      ]
    },
    endTimes: {
      'monday': [
        new Date('2023-05-01T15:30:00'),
      
      ],
      
      'thursday': [
        new Date('2023-05-05T15:30:00'),
       
      ]
    }
  };
  
 export function getObjectById(id) {
    switch (id) {
      case 'A':
        return A;
      case 'B':
        return B;
      case 'C':
        return C;
      case 'D':
        return D;
      case 'E':
        return E;
      case 'F':
        return F;
      case 'G':
        return G;
      case 'H':
        return H;
      case 'I':
        return I;
        case 'J':
        return J;
        case 'K':
        return K;
        case 'L':
        return L;
      default:
        return null;
    }
  }

  export function generateEvents(courseTimeSlot,title){
    const events = [];
    
    Object.keys(courseTimeSlot.startTimes).forEach(day => {
      const startTimes = courseTimeSlot.startTimes[day];
      const endTimes = courseTimeSlot.endTimes[day];
    
      startTimes.forEach((startTime, i) => {
        const endTime = endTimes[i];
        const rruleOptions = {
          freq: RRule.WEEKLY,
          byweekday: RRule[day.toUpperCase().substring(0, 2)],
          dtstart: startTime,
          until: new Date('2023-06-30T23:59:59'),
          byhour: [startTime.getHours()]
        };
    
        const rrule = new RRule(rruleOptions);
        const occurrenceDates = rrule.all();
    
        occurrenceDates.forEach(date => {
          events.push({
            title: title,
            start: date,
            end: new Date(date.getTime() + (endTime - startTime))
          });
        });
      });
    });
  return events;
    }