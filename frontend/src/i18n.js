import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import English files
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAiDetector from './locales/en/aiDetector.json';
import enImageFormatter from './locales/en/imageFormatter.json';
import enImageCompressor from './locales/en/imageCompressor.json';
import enColorPalette from './locales/en/colorPalette.json';
import enHtmlEntities from './locales/en/htmlEntities.json';
import enResumeBuilder from './locales/en/resumeBuilder.json';
import enPdfWriter from './locales/en/pdfWriter.json';
import enIpFinder from './locales/en/ipFinder.json';
import enSpeedTest from './locales/en/speedTest.json';
import enCalculator from './locales/en/calculator.json';
import enAgeCalculator from './locales/en/ageCalculator.json';
import enDateDifference from './locales/en/dateDifference.json';
import enWeightAnalyzer from './locales/en/weightAnalyzer.json';
import enHumanizer from './locales/en/humanizer.json';
import enVideoToAudio from './locales/en/videoToAudio.json';
import enDeviceHealth from './locales/en/deviceHealth.json';
import enWaterRemover from './locales/en/waterRemover.json';
import enAboutUs from './locales/en/aboutUs.json';
// Import Tamil files
import taCommon from './locales/ta/common.json';
import taHome from './locales/ta/home.json';
import taAiDetector from './locales/ta/aiDetector.json';
import taImageFormatter from './locales/ta/imageFormatter.json';
import taImageCompressor from './locales/ta/imageCompressor.json';
import taColorPalette from './locales/ta/colorPalette.json';
import taHtmlEntities from './locales/ta/htmlEntities.json';
import taResumeBuilder from './locales/ta/resumeBuilder.json';
import taPdfWriter from './locales/ta/pdfWriter.json';
import taIpFinder from './locales/ta/ipFinder.json';
import taSpeedTest from './locales/ta/speedTest.json';
import taCalculator from './locales/ta/calculator.json';
import taAgeCalculator from './locales/ta/ageCalculator.json';
import taDateDifference from './locales/ta/dateDifference.json';
import taWeightAnalyzer from './locales/ta/weightAnalyzer.json';
import taHumanizer from './locales/ta/humanizer.json';
import taVideoToAudio from './locales/ta/videoToAudio.json';
import taDeviceHealth from './locales/ta/deviceHealth.json';
import taWaterRemover from './locales/ta/waterRemover.json';
import taAboutUs from './locales/ta/aboutUs.json';






const resources = {
  en: {
    translation: {
      ...enCommon,
      ...enHome,
      ...enAiDetector,
      ...enImageFormatter,
      ...enImageCompressor,
      ...enColorPalette,
      ...enHtmlEntities,
      ...enResumeBuilder,
      ...enPdfWriter,
      ...enIpFinder,
      ...enSpeedTest,
      ...enCalculator,
      ...enAgeCalculator,
      ...enDateDifference,
      ...enWeightAnalyzer,
      ...enHumanizer,
      ...enVideoToAudio,
      ...enDeviceHealth,
      ...enWaterRemover,
      ...enAboutUs
    },
  },
  ta: {
    translation: {
      ...taCommon,
      ...taHome,
      ...taAiDetector,
      ...taImageFormatter,
      ...taImageCompressor,
      ...taColorPalette,
      ...taHtmlEntities,
      ...taResumeBuilder,
      ...taPdfWriter,
      ...taIpFinder,
      ...taSpeedTest,
      ...taCalculator,
      ...taAgeCalculator,
      ...taDateDifference,
      ...taWeightAnalyzer,
      ...taHumanizer,
      ...taVideoToAudio,
      ...taDeviceHealth ,
      ...taWaterRemover,
      ...taAboutUs,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;