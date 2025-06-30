def cricket_scorecard(players):
    striker_index = 0
    next_player_index = 1  # Next player waiting to bat
    scores = {player: 0 for player in players}
    balls_faced = {player: 0 for player in players}
    wickets = 0
    extras = 0
    ball_number = 1

    print("\nEnter runs for each ball or special event:")
    print("Normal runs: 0-6")
    print("'W' for wicket, 'N' for no ball, 'R' for run out, 'WD' or 'WIDE' for wide")
    print("Enter '-1' to end innings\n")

    while wickets < len(players) - 1:
        event = input(f"Ball {ball_number} (run/W/N/R/WD): ").strip().upper()

        if event == '-1':
            break

        if event == 'N':
            extras += 1
            print(f"No ball! 1 extra run added. Total extras: {extras}")
            continue  # ball not counted

        if event in ['WD', 'WIDE']:
            extras += 1
            print(f"Wide ball! 1 extra run added. Total extras: {extras}")
            continue  # ball not counted

        striker = players[striker_index]

        if event == 'W':  # Wicket
            balls_faced[striker] += 1
            wickets += 1
            print(f"Wicket! {striker} is out.")
            if next_player_index < len(players):
                striker_index = next_player_index
                next_player_index += 1
                print(f"Next player is {players[striker_index]}")
            else:
                print("All players are out!")
                break
            ball_number += 1
            continue

        elif event == 'R':  # Run out
            balls_faced[striker] += 1
            wickets += 1
            print(f"Run out! {striker} is out.")
            if next_player_index < len(players):
                striker_index = next_player_index
                next_player_index += 1
                print(f"Next player is {players[striker_index]}")
            else:
                print("All players are out!")
                break
            ball_number += 1
            continue

        else:
            try:
                runs = int(event)
                if runs < 0 or runs > 6:
                    print("Invalid runs. Enter 0-6, W, N, R, WD, or -1 to end.")
                    continue
            except ValueError:
                print("Invalid input. Enter 0-6, W, N, R, WD, or -1 to end.")
                continue

            scores[striker] += runs
            balls_faced[striker] += 1
            print(f"{striker} scored {runs} runs.")

            if runs % 2 != 0:
                striker_index = (striker_index + 1) % len(players)

            ball_number += 1

    print("\nInnings ended.")
    print(f"Total wickets fallen: {wickets}")
    print(f"Total extras (no balls + wides): {extras}\n")

    print("Final Scorecard:")
    for player in players:
        print(f"{player} - Runs: {scores[player]}, Balls: {balls_faced[player]}")

# Program start
num_players = int(input("Enter number of players: "))
players = [f"Player{i+1}" for i in range(num_players)]

cricket_scorecard(players)
