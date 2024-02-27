package nh.recipify.domain;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Component("durationFormatter")
public class MinuteDurationFormatter {
    public String formatMinutes(int minutes) {
        int hours = minutes / 60;
        int remainingMinutes = minutes % 60;

        String hoursText = hours > 0
            ? hours == 1 ? "1 Hour " : hours + " Hours "
            : "";

        String minutesText = remainingMinutes > 0
            ? remainingMinutes == 1 ? "1 Minute" : remainingMinutes + " Minutes"
            : "";

        return hoursText + minutesText;
    }

    public String formatDate(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd. MMMM yyyy", Locale.ENGLISH);
        return dateTime.format(formatter);
    }


}
