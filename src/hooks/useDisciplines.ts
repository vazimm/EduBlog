import { useEffect, useState } from "react";
import type { IDiscipline } from "../interfaces/IDiscipline";
import { getDisciplinesRequest } from "../services/catalogService";

export function useDisciplines() {
  const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);

  useEffect(() => {
    let ignore = false;

    async function loadDisciplines() {
      try {
        const response = await getDisciplinesRequest();

        if (ignore) return;

        setDisciplines(
          response
            .filter((discipline) => discipline.isActive)
            .sort((left, right) => left.order - right.order),
        );
      } catch {
        if (ignore) return;
        setDisciplines([]);
      }
    }

    void loadDisciplines();

    return () => {
      ignore = true;
    };
  }, []);

  return disciplines;
}
