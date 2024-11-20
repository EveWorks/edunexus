import {
  isDesktop,
  isMobile,
  isTablet,
  isIPad13,
  isAndroid,
  isWinPhone,
  isIOS,
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  isEdge,
} from "react-device-detect";

interface DeviceDetection {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isIPad13: boolean;
  isAndroid: boolean;
  isWinPhone: boolean;
  isIOS: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isOpera: boolean;
  isIE: boolean;
  isEdge: boolean;
}

const useDevice = (): DeviceDetection => ({
  isMobile,
  isDesktop,
  isTablet,
  isIPad13,
  isAndroid,
  isWinPhone,
  isIOS,
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  isEdge,
});

export default useDevice;
