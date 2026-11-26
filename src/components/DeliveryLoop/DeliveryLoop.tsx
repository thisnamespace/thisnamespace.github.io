import { Box, Typography } from '@mui/material';
import { Loop } from '@mui/icons-material';
import { keyframes } from '@mui/material/styles';
import type { LoopStage } from '../../types';
import { fonts } from '../../styles/theme';

export interface DeliveryLoopProps {
  title: string;
  stages: LoopStage[];
  /** Sentence shown after the last stage, describing how the loop closes. */
  closing: string;
}

const stageIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Fixed colours: the panel is deep petrol in both themes, like the logo's own ground.
const PANEL = {
  background: '#0A3F4A',
  bracket: '#6CCBD9',
  dot: '#F2B24C',
  text: '#FFFFFF',
  textSoft: '#CFE6E8',
  rail: 'rgba(108, 203, 217, 0.45)',
};

const BRACKET_WIDTH = 18;

/** The square brackets from the thisnamespace mark, drawn around the figure. */
const bracket = (side: 'left' | 'right') => ({
  content: '""',
  position: 'absolute' as const,
  top: 14,
  bottom: 14,
  [side]: 14,
  width: BRACKET_WIDTH,
  border: `4px solid ${PANEL.bracket}`,
  [side === 'left' ? 'borderRight' : 'borderLeft']: 'none',
  borderRadius: side === 'left' ? '4px 0 0 4px' : '0 4px 4px 0',
  pointerEvents: 'none' as const,
});

const DeliveryLoop = ({ title, stages, closing }: DeliveryLoopProps) => (
  <Box
    component="figure"
    data-testid="delivery-loop"
    sx={{
      position: 'relative',
      bgcolor: PANEL.background,
      color: PANEL.text,
      borderRadius: 2,
      px: { xs: 5.5, sm: 7 },
      py: { xs: 4.5, sm: 5.5 },
      '&::before': bracket('left'),
      '&::after': bracket('right'),
    }}
  >
    <Typography
      component="figcaption"
      sx={{
        fontFamily: fonts.display,
        fontSize: '1rem',
        fontWeight: 550,
        color: PANEL.textSoft,
        mb: 3,
      }}
    >
      {title}
    </Typography>

    <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {stages.map((stage, index) => (
        <Box
          component="li"
          key={stage.id}
          sx={{
            position: 'relative',
            pl: 4,
            pb: 3,
            animation: `${stageIn} 480ms cubic-bezier(0.2, 0.7, 0.2, 1) both`,
            animationDelay: `${200 + index * 170}ms`,
            // Dot
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '0.5em',
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: PANEL.dot,
            },
            // Rail to the next stage
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 5,
              top: 'calc(0.5em + 18px)',
              bottom: -4,
              width: 2,
              bgcolor: PANEL.rail,
            },
          }}
        >
          <Typography
            component="p"
            sx={{
              fontFamily: fonts.display,
              fontSize: '1.45rem',
              fontWeight: 650,
              lineHeight: 1.2,
              letterSpacing: '-0.015em',
            }}
          >
            {stage.name}
          </Typography>
          <Typography variant="body2" sx={{ color: PANEL.textSoft, mt: 0.5, maxWidth: '34ch' }}>
            {stage.change}
          </Typography>
        </Box>
      ))}
    </Box>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.25,
        ml: '-6px',
        animation: `${stageIn} 480ms cubic-bezier(0.2, 0.7, 0.2, 1) both`,
        animationDelay: `${200 + stages.length * 170}ms`,
      }}
    >
      <Loop aria-hidden sx={{ color: PANEL.bracket, fontSize: 24, mt: '1px' }} />
      <Typography variant="body2" sx={{ fontWeight: 550 }}>
        {closing}
      </Typography>
    </Box>
  </Box>
);

export default DeliveryLoop;
