import styles from "./Icon.module.css";
import BellSvg from '../../assets/bell.svg?react';
import BankSvg from '../../assets/bank.svg?react';
import TransportSvg from '../../assets/transport.svg?react';
import HobbySVG from '../../assets/hobby.svg?react';
import MobileSvg from '../../assets/mobile.svg?react';
import OtherPaymentsSvg from '../../assets/other-payments.svg?react';
import DebtsSvg from '../../assets/debts.svg?react';
import UtilitySvg from '../../assets/utility.svg?react';
import OnlineShoppingSvg from '../../assets/online-shopping.svg?react';
import RestaurantsSvg from '../../assets/restaurants.svg?react';

const iconMap = {
  bell: BellSvg,
  bank: BankSvg,
  transport: TransportSvg,
  hobby: HobbySVG,
  mobile: MobileSvg,
  otherPayments: OtherPaymentsSvg,
  debts: DebtsSvg,
  utility: UtilitySvg,
  onlineShopping: OnlineShoppingSvg,
  restaurants: RestaurantsSvg,
} as const;

type IconName = keyof typeof iconMap;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: IconName;
  size?: number;
  color?: string;
  ariaLabel?: string;
}

export const Icon = ({
  iconName,
  size = 24,
  color = "currentColor",
  ariaLabel,
  className,
  ...rest
}: IconProps) => {
  const Svg = iconMap[iconName];

  if (!Svg) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Icon] Unknown icon: "${iconName}"`);
    }
    return null;
  }

  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      role="img"
      aria-label={ariaLabel || iconName}
      className={`${styles.icon}${className ? ` ${className}` : ""}`}
      {...rest}
    />
  );
};