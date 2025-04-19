import flask
from flask import Flask, request, jsonify, render_template
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# ✅ Define MySQL connection
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Tangjunjie918.',
    'database': 'flight_tracking'
}

def get_db_connection():
    return mysql.connector.connect(**mysql_config)

# ----------- Procedure Endpoints ----------- #

def execute_procedure(proc_name, args):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.callproc(proc_name, args)
        conn.commit()
        return {'message': f'{proc_name} executed successfully'}
    except Error as e:
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()

@app.route('/api/<proc>', methods=['POST'])
def call_proc(proc):
    data = request.get_json()
    proc_args_map = {
        'add_airplane': ['ip_airlineID', 'ip_tail_num', 'ip_seat_capacity', 'ip_speed', 'ip_locationID', 'ip_plane_type', 'ip_maintenanced', 'ip_model', 'ip_neo'],
        'add_airport': ['ip_airportID', 'ip_airport_name', 'ip_city', 'ip_state', 'ip_country', 'ip_locationID'],
        'add_person': ['ip_personID', 'ip_first_name', 'ip_last_name', 'ip_locationID', 'ip_taxID', 'ip_experience', 'ip_miles', 'ip_funds'],
        'grant_or_revoke_pilot_license': ['ip_personID', 'ip_license'],
        'offer_flight': ['ip_flightID', 'ip_routeID', 'ip_support_airline', 'ip_support_tail', 'ip_progress', 'ip_next_time', 'ip_cost'],
        'flight_landing': ['ip_flightID'],
        'flight_takeoff': ['ip_flightID'],
        'passengers_board': ['ip_flightID'],
        'passengers_disembark': ['ip_flightID'],
        'assign_pilot': ['ip_flightID', 'ip_personID'],
        'recycle_crew': ['ip_flightID'],
        'retire_flight': ['ip_flightID'],
        'simulation_cycle': []
    }

    if proc not in proc_args_map:
        return jsonify({'error': f'Procedure {proc} is not supported'}), 400

    args = [data.get(arg) for arg in proc_args_map[proc]]
    result = execute_procedure(proc, args)

    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result)

# ----------- View Endpoints ----------- #
from datetime import timedelta

@app.route('/api/view/<view_name>', methods=['GET'])
def get_view(view_name):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(f"SELECT * FROM `{view_name}`")
        results = cursor.fetchall()

        # 🔧 Convert any timedelta to string
        for row in results:
            for k, v in row.items():
                if isinstance(v, timedelta):
                    row[k] = str(v)

        return jsonify(results)
    except Exception as e:
        print(f"❌ Error querying view {view_name}:", e)
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


# ----------- Serve Frontend ----------- #
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)