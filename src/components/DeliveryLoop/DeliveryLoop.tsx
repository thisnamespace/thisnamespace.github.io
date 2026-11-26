import { useCallback, useEffect, useId, useState } from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';
import { Loop, PlayArrow, Stop } from '@mui/icons-material';
import { keyframes } from '@mui/material/styles';
import type { LoopStage } from '../../types';
import { fonts } from '../../styles/theme';

export interface DeliveryLoopProps {
  title: string;
  stages: LoopStage[];
  /** Sentence shown after the last stage, describing how the loop closes. */
  closing: string;
  runLabel: string;
  rerunLabel: string;
  stopLabel: string;
  /** Time each stage stays lit while the loop runs. */
  stepMs?: number;
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

/**
 * The delivery loop. Each stage opens to show the belief behind it, and
 * "Run the loop" steps through the stages in order.
 */
const DeliveryLoop = ({
  title,
  stages,
  closing,
  runLabel,
  rerunLabel,
  stopLabel,
  stepMs = 1400,
}: DeliveryLoopProps) => {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(0);

  // While running, move to the next stage after each pause; finish after the last one.
  useEffect(() => {
    if (!running || activeIndex === null) {
      return;
    }
    const timer = window.setTimeout(() => {
      if (activeIndex < stages.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setRunning(false);
        setActiveIndex(null);
        setRounds((count) => count + 1);
      }
    }, stepMs);
    return () => window.clearTimeout(timer);
  }, [running, activeIndex, stages.length, stepMs]);

  const handleRunToggle = useCallback(() => {
    if (running) {
      setRunning(false);
      return;
    }
    setActiveIndex(0);
    setRunning(true);
  }, [running]);

  const handleStageClick = useCallback((index: number) => {
    setRunning(false);
    setActiveIndex((current) => (current === index ? null : index));
  }, []);

  const justFinished = !running && activeIndex === null && rounds > 0;

  return (
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
        {stages.map((stage, index) => {
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;
          const detailId = `${baseId}-detail-${stage.id}`;

          return (
            <Box
              component="li"
              key={stage.id}
              sx={{
                position: 'relative',
                pl: 4,
                pb: 2.5,
                opacity: isDimmed ? 0.55 : 1,
                transition: 'opacity 240ms ease',
                animation: `${stageIn} 480ms cubic-bezier(0.2, 0.7, 0.2, 1) both`,
                animationDelay: `${200 + index * 170}ms`,
                // Dot
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: isActive ? -3 : 0,
                  top: isActive ? 'calc(0.5em - 3px)' : '0.5em',
                  width: isActive ? 18 : 12,
                  height: isActive ? 18 : 12,
                  borderRadius: '50%',
                  bgcolor: PANEL.dot,
                  boxShadow: isActive ? `0 0 0 5px rgba(242, 178, 76, 0.28)` : 'none',
                  transition: 'all 240ms ease',
                },
                // Rail to the next stage
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 5,
                  top: 'calc(0.5em + 22px)',
                  bottom: -2,
                  width: 2,
                  bgcolor: PANEL.rail,
                },
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => handleStageClick(index)}
                aria-expanded={isActive}
                aria-controls={detailId}
                data-testid={`loop-stage-${stage.id}`}
                sx={{
                  display: 'block',
                  width: '100%',
                  minHeight: 44,
                  p: 0,
                  border: 0,
                  background: 'none',
                  color: 'inherit',
                  textAlign: 'left',
                  cursor: 'pointer',
                  font: 'inherit',
                  '&:hover .loop-stage-name': {
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  },
                }}
              >
                <Typography
                  component="span"
                  className="loop-stage-name"
                  sx={{
                    display: 'block',
                    fontFamily: fonts.display,
                    fontSize: '1.45rem',
                    fontWeight: 650,
                    lineHeight: 1.2,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {stage.name}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ display: 'block', color: PANEL.textSoft, mt: 0.5, maxWidth: '34ch' }}
                >
                  {stage.change}
                </Typography>
              </Box>
              <Collapse in={isActive} id={detailId} unmountOnExit>
                <Typography
                  sx={{
                    mt: 1,
                    maxWidth: '30ch',
                    fontSize: '1.0625rem',
                    lineHeight: 1.45,
                    color: PANEL.dot,
                  }}
                >
                  {stage.detail}
                </Typography>
              </Collapse>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.25,
          ml: '-6px',
          opacity: activeIndex !== null ? 0.55 : 1,
          transition: 'opacity 240ms ease',
          animation: `${stageIn} 480ms cubic-bezier(0.2, 0.7, 0.2, 1) both`,
          animationDelay: `${200 + stages.length * 170}ms`,
        }}
      >
        <Loop
          aria-hidden
          sx={{ color: justFinished ? PANEL.dot : PANEL.bracket, fontSize: 24, mt: '1px' }}
        />
        <Typography variant="body2" sx={{ fontWeight: 550 }}>
          {closing}
        </Typography>
      </Box>

      <Button
        onClick={handleRunToggle}
        startIcon={running ? <Stop /> : <PlayArrow />}
        data-testid="loop-run"
        sx={{
          mt: 3,
          color: PANEL.background,
          bgcolor: PANEL.bracket,
          '&:hover': { bgcolor: '#8EDBE6' },
        }}
      >
        {running ? stopLabel : rounds > 0 ? rerunLabel : runLabel}
      </Button>

      {/* Announces the stage as the loop runs, for screen reader users. */}
      <Box
        role="status"
        aria-live="polite"
        sx={{
          // Visually hidden. Pixel strings matter: a bare 1 would mean 100% in sx.
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
        }}
      >
        {running && activeIndex !== null ? stages[activeIndex].name : ''}
      </Box>
    </Box>
  );
};

export default DeliveryLoop;
