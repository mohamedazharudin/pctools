import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import English files
import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import aiDetectorEn from './locales/en/aiDetector.json';
import imageFormatterEn from './locales/en/imageFormatter.json';
import imageCompressorEn from './locales/en/imageCompressor.json';
import colorPaletteEn from './locales/en/colorPalette.json';
import htmlEntitiesEn from './locales/en/htmlEntities.json';
import resumeBuilderEn from './locales/en/resumeBuilder.json';
import pdfWriterEn from './locales/en/pdfWriter.json';
import ipFinderEn from './locales/en/ipFinder.json';
import speedTestEn from './locales/en/speedTest.json';
import calculatorEn from './locales/en/calculator.json';
import ageCalculatorEn from './locales/en/ageCalculator.json';
import dateDifferenceEn from './locales/en/dateDifference.json';
import weightAnalyzerEn from './locales/en/weightAnalyzer.json';
import humanizerEn from './locales/en/humanizer.json';
import videoToAudioEn from './locales/en/videoToAudio.json';
import deviceHealthEn from './locales/en/deviceHealth.json';
import waterRemoverEn from './locales/en/waterRemover.json';
import aboutUsEn from './locales/en/aboutUs.json';
import passwordGeneratorEn from './locales/en/passwordGenerator.json';


// Import Tamil files
import commonTa from './locales/ta/common.json';
import homeTa from './locales/ta/home.json';
import aiDetectorTa from './locales/ta/aiDetector.json';
import imageFormatterTa from './locales/ta/imageFormatter.json';
import imageCompressorTa from './locales/ta/imageCompressor.json';
import colorPaletteTa from './locales/ta/colorPalette.json';
import htmlEntitiesTa from './locales/ta/htmlEntities.json';
import resumeBuilderTa from './locales/ta/resumeBuilder.json';
import pdfWriterTa from './locales/ta/pdfWriter.json';
import ipFinderTa from './locales/ta/ipFinder.json';
import speedTestTa from './locales/ta/speedTest.json';
import calculatorTa from './locales/ta/calculator.json';
import ageCalculatorTa from './locales/ta/ageCalculator.json';
import dateDifferenceTa from './locales/ta/dateDifference.json';
import weightAnalyzerTa from './locales/ta/weightAnalyzer.json';
import humanizerTa from './locales/ta/humanizer.json';
import videoToAudioTa from './locales/ta/videoToAudio.json';
import deviceHealthTa from './locales/ta/deviceHealth.json';
import waterRemoverTa from './locales/ta/waterRemover.json';
import aboutUsTa from './locales/ta/aboutUs.json';
import passwordGeneratorTa from './locales/ta/passwordGenerator.json';
const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    aiDetector: aiDetectorEn,
    imageFormatter: imageFormatterEn,
    imageCompressor: imageCompressorEn,
    colorPalette: colorPaletteEn,
    htmlEntities: htmlEntitiesEn,
    resumeBuilder: resumeBuilderEn,
    pdfWriter: pdfWriterEn,
    ipFinder: ipFinderEn,
    speedTest: speedTestEn,
    calculator: calculatorEn,
    ageCalculator: ageCalculatorEn,
    dateDifference: dateDifferenceEn,
    weightAnalyzer: weightAnalyzerEn,
    humanizer: humanizerEn,
    videoToAudio: videoToAudioEn,
    deviceHealth: deviceHealthEn,
    waterRemover: waterRemoverEn,
    aboutUs: aboutUsEn,
    passwordGenerator: passwordGeneratorEn
  },
  ta: {
    common: commonTa,
    home: homeTa,
    aiDetector: aiDetectorTa,
    imageFormatter: imageFormatterTa,
    imageCompressor: imageCompressorTa,
    colorPalette: colorPaletteTa,
    htmlEntities: htmlEntitiesTa,
    resumeBuilder: resumeBuilderTa,
    pdfWriter: pdfWriterTa,
    ipFinder: ipFinderTa,
    speedTest: speedTestTa,
    calculator: calculatorTa,
    ageCalculator: ageCalculatorTa,
    dateDifference: dateDifferenceTa,
    weightAnalyzer: weightAnalyzerTa,
    humanizer: humanizerTa,
    videoToAudio: videoToAudioTa,
    deviceHealth: deviceHealthTa,
    waterRemover: waterRemoverTa,
    aboutUs: aboutUsTa,
    passwordGenerator : passwordGeneratorTa,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;