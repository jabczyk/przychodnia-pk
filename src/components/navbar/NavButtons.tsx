import { Button } from "../forms/Button";

export const NavButtons: React.FC = () => {
  return (
    <div className="flex w-1/3 gap-3 py-1">
      <Button variant="secondary" size="base">
        Overview
      </Button>
      <Button variant="secondary" size="base">
        Calendar
      </Button>
      <Button variant="secondary" size="base">
        Doctors
      </Button>
      <Button variant="secondary" size="base">
        Medications
      </Button>
    </div>
  );
};
